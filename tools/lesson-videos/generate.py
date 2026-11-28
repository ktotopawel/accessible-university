"""Generate slide-show lesson videos from lessons.json.

For every lesson: renders 1280x720 slides (same look as the "Liczby zespolone" video),
synthesises Polish narration with Piper (pl_PL-gosia-medium), and writes
  public/video/<file>.mp4            H.264 + AAC, faststart
  public/video/<file>.pl.vtt         captions, one cue per narration sentence, exact timing
  public/video/<file>-poster.jpg     first slide
  src/data/transcripts/<slug>.json   chapters + per-slide transcript ([Obraz: …] + narration),
                                     duration and file size for the lesson page

Runs inside the Docker image from ./Dockerfile; see README.md.
"""

import json
import os
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from piper import PiperVoice

ROOT = Path(os.environ.get('REPO', '/work'))
SPEC = Path(__file__).with_name('lessons.json')
VIDEO_DIR = ROOT / 'public' / 'video'
TRANSCRIPT_DIR = ROOT / 'src' / 'data' / 'transcripts'
VOICE = '/voices/pl_PL-gosia-medium.onnx'

W, H = 1280, 720
HEADER, SIDEBAR = 64, 266
NAVY, BLUE, TEXT, GRAY = '#1f2a5c', '#3a5bd9', '#1f2a37', '#6b7280'
MAIN_BG, SIDE_BG, HIGHLIGHT, BORDER, HEADER_SUB = '#f4f7fb', '#ffffff', '#e6ebfb', '#e5e7eb', '#c7d2fe'
EXIT_GREEN = '#00843d'

LEAD, GAP, SLIDE_TAIL = 0.5, 0.35, 0.9  # seconds of silence

FONT_DIR = Path('/usr/share/fonts/opentype/inter')


def font(weight, size):
    return ImageFont.truetype(str(FONT_DIR / f'Inter-{weight}.otf'), size)


def wrap(draw, text, fnt, width):
    lines, line = [], ''
    for word in text.split():
        test = f'{line} {word}'.strip()
        if draw.textlength(test, font=fnt) <= width or not line:
            line = test
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_spaced(draw, xy, text, fnt, fill, spacing):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + spacing


def number_badge(draw, cx, cy, n, r=18):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=BLUE)
    draw.text((cx, cy), str(n), font=font('Bold', 18), fill='white', anchor='mm')


def render_slide(lesson, index):
    slides = lesson['slides']
    slide = slides[index]
    img = Image.new('RGB', (W, H), MAIN_BG)
    d = ImageDraw.Draw(img)

    # Header bar
    d.rectangle((0, 0, W, HEADER), fill=NAVY)
    d.text((42, HEADER / 2), f"Kurs: {lesson['course']}", font=font('Bold', 20), fill='white', anchor='lm')
    d.text((W - 42, HEADER / 2), lesson['module'], font=font('Regular', 20), fill=HEADER_SUB, anchor='rm')

    # Sidebar with chapters, current one highlighted
    d.rectangle((0, HEADER, SIDEBAR, H), fill=SIDE_BG)
    d.line((SIDEBAR, HEADER, SIDEBAR, H), fill=BORDER, width=1)
    draw_spaced(d, (30, 96), 'SPIS TREŚCI', font('SemiBold', 15), GRAY, 1.6)
    y = 140
    for i, s in enumerate(slides):
        current = i == index
        f = font('SemiBold' if current else 'Regular', 18)
        lines = wrap(d, s['chapter'], f, 200)
        h = len(lines) * 22
        if current:
            d.rounded_rectangle((18, y - 12, 247, y + h + 10), radius=8, fill=HIGHLIGHT)
        for j, line in enumerate(lines):
            d.text((30, y + j * 22), line, font=f, fill=NAVY if current else '#4b5563')
        y += h + 28

    # Main content
    x0, right = 340, W - 60
    kind = slide['kind']
    if kind == 'title':
        d.text((x0, 200), slide['kicker'], font=font('SemiBold', 22), fill=BLUE)
        ty = 240
        for line in wrap(d, slide['title'], font('Bold', 72), right - x0):
            d.text((x0, ty), line, font=font('Bold', 72), fill=NAVY)
            ty += 86
        d.text((x0, ty + 20), slide['subtitle'], font=font('Regular', 24), fill=TEXT)
    else:
        d.text((x0, 112), slide['title'], font=font('Bold', 44), fill=NAVY)
        if kind == 'steps':
            cols, cw, ch, gx, gy = 3, 270, 130, 24, 24
            for i, item in enumerate(slide['items']):
                cx = x0 + (i % cols) * (cw + gx)
                cy = 200 + (i // cols) * (ch + gy)
                d.rounded_rectangle((cx, cy, cx + cw, cy + ch), radius=10, fill='white', outline=BORDER, width=2)
                number_badge(d, cx + 34, cy + 36, i + 1)
                for j, line in enumerate(wrap(d, item, font('Medium', 21), cw - 40)):
                    d.text((cx + 20, cy + 66 + j * 27), line, font=font('Medium', 21), fill=TEXT)
            note_y = 200 + 2 * (ch + gy) + 14
            d.rounded_rectangle((x0, note_y, x0 + 3 * cw + 2 * gx, note_y + 56), radius=10, fill=HIGHLIGHT)
            d.text((x0 + 24, note_y + 28), slide['note'], font=font('SemiBold', 22), fill=NAVY, anchor='lm')
        else:
            list_right = right - (390 if kind == 'sign' else 0)
            ly = 210
            for i, item in enumerate(slide['items']):
                lines = wrap(d, item, font('Regular', 28), list_right - x0 - 60)
                if slide.get('numbered', True):
                    number_badge(d, x0 + 18, ly + 18, i + 1)
                else:
                    d.rounded_rectangle((x0 + 10, ly + 12, x0 + 24, ly + 26), radius=3, fill=BLUE)
                for j, line in enumerate(lines):
                    d.text((x0 + 56, ly + j * 38), line, font=font('Regular', 28), fill=TEXT)
                ly += len(lines) * 38 + 30
            if kind == 'sign':
                # Green emergency-exit sign: white arrow pointing left + "WYJŚCIE"
                sx, sy, sw, sh = right - 350, 230, 350, 150
                d.rounded_rectangle((sx, sy, sx + sw, sy + sh), radius=10, fill=EXIT_GREEN)
                ay = sy + sh / 2
                d.polygon([(sx + 30, ay), (sx + 85, ay - 42), (sx + 85, ay - 18), (sx + 125, ay - 18),
                           (sx + 125, ay + 18), (sx + 85, ay + 18), (sx + 85, ay + 42)], fill='white')
                d.text((sx + 145 + (sw - 165) / 2, ay), 'WYJŚCIE', font=font('Bold', 34), fill='white', anchor='mm')

    # Slide counter + progress bar
    n, total = index + 1, len(slides)
    d.text((W - 35, H - 28), f'{n} / {total}', font=font('Regular', 18), fill=GRAY, anchor='rm')
    d.rectangle((SIDEBAR, H - 5, SIDEBAR + (W - SIDEBAR) * n / total, H), fill=BLUE)
    return img


def describe(lesson, slide, index):
    """Text description of the slide for the transcript – generated from the same data as the image."""
    if slide.get('numbered', True):
        items = ' '.join(f'{i + 1}. {t}.' for i, t in enumerate(slide.get('items', [])))
    else:
        items = '; '.join(slide.get('items', [])) + '.'
    if slide['kind'] == 'title':
        return (f"[Obraz: Slajd tytułowy. Nagłówek „{slide['kicker']}”, duży tytuł „{slide['title']}” "
                f"i podtytuł „{slide['subtitle']}”. Po lewej spis treści lekcji.]")
    if slide['kind'] == 'steps':
        return (f"[Obraz: Slajd „{slide['title']}” z sześcioma ponumerowanymi kartami: {items} "
                f"Pod kartami napis „{slide['note']}”.]")
    if slide['kind'] == 'sign':
        return (f"[Obraz: Slajd „{slide['title']}” z listą: {items} Obok zielony znak wyjścia ewakuacyjnego "
                f"z białą strzałką w lewo i napisem „WYJŚCIE”.]")
    return f"[Obraz: Slajd „{slide['title']}” z listą: {items}]"


def caption_lines(text, max_chars=42):
    words, lines, line = text.split(), [], ''
    for w in words:
        if len(f'{line} {w}'.strip()) <= max_chars or not line:
            line = f'{line} {w}'.strip()
        else:
            lines.append(line)
            line = w
    lines.append(line)
    # Never more than 2 lines per cue: merge the rest (rare; keep narration sentences short).
    return lines if len(lines) <= 2 else [' '.join(lines[: len(lines) // 2]), ' '.join(lines[len(lines) // 2 :])]


def ts(sec):
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f'{int(h):02d}:{int(m):02d}:{s:06.3f}'


def mmss(sec):
    return f'{int(sec) // 60}:{int(sec) % 60:02d}'


def human_duration(sec):
    sec = round(sec)
    return f'{sec} s' if sec < 60 else f'{sec // 60} min {sec % 60} s'


def build(lesson, voice, tmp):
    slug, base = lesson['slug'], lesson['file']
    rate = voice.config.sample_rate
    frames = bytearray()
    sample_width = 2

    def silence(sec):
        frames.extend(b'\x00\x00' * int(rate * sec))

    t = 0.0
    silence(LEAD)
    t += LEAD
    cues, slide_starts, slide_durations, transcript = [], [], [], []
    for i, slide in enumerate(lesson['slides']):
        start = 0.0 if i == 0 else t
        slide_starts.append(start)
        spoken = []
        for k, part in enumerate(slide['narration']):
            say = part['say'] if isinstance(part, dict) else part
            show = part['show'] if isinstance(part, dict) else part
            wav_path = tmp / f'{slug}-{i}-{k}.wav'
            with wave.open(str(wav_path), 'wb') as wf:
                voice.synthesize_wav(say, wf)
            with wave.open(str(wav_path), 'rb') as rf:
                assert rf.getframerate() == rate and rf.getsampwidth() == sample_width and rf.getnchannels() == 1
                data = rf.readframes(rf.getnframes())
            dur = len(data) / (rate * sample_width)
            cues.append((t, t + dur, show))
            frames.extend(data)
            t += dur
            spoken.append(show)
            if k < len(slide['narration']) - 1:
                silence(GAP)
                t += GAP
        silence(SLIDE_TAIL)
        t += SLIDE_TAIL
        slide_durations.append(t - start)
        transcript.append({
            'title': f"Slajd {i + 1}: {slide['title']} ({mmss(start)})",
            'image': describe(lesson, slide, i),
            # Narration in transcript = caption text, joined into sentences per slide.
            'narration': [' '.join(spoken)],
        })

    audio = tmp / f'{slug}.wav'
    with wave.open(str(audio), 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(bytes(frames))

    # Slides → images, concat list with exact durations
    concat = tmp / f'{slug}.txt'
    with concat.open('w') as f:
        for i, dur in enumerate(slide_durations):
            png = tmp / f'{slug}-{i}.png'
            render_slide(lesson, i).save(png)
            if i == 0:
                render_slide(lesson, 0).convert('RGB').save(VIDEO_DIR / f'{base}-poster.jpg', quality=88)
            f.write(f"file '{png}'\nduration {dur:.3f}\n")
        f.write(f"file '{png}'\n")  # concat demuxer needs the last file repeated

    out = VIDEO_DIR / f'{base}.mp4'
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(concat), '-i', str(audio),
        '-vf', 'fps=25,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-tune', 'stillimage',
        '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-t', f'{t:.3f}', str(out),
    ], check=True)

    with (VIDEO_DIR / f'{base}.pl.vtt').open('w', encoding='utf-8') as f:
        f.write(f"WEBVTT - {lesson['slides'][0]['title']} (napisy po polsku)\n\n")
        for n, (a, b, text) in enumerate(cues, 1):
            f.write(f'{n}\n{ts(a)} --> {ts(b)}\n' + '\n'.join(caption_lines(text)) + '\n\n')

    size = out.stat().st_size / 1_000_000
    TRANSCRIPT_DIR.mkdir(parents=True, exist_ok=True)
    data = {
        '_generated': 'by tools/lesson-videos/generate.py from lessons.json – do not edit by hand',
        'duration': human_duration(t),
        'size': f'{max(size, 0.1):.1f} MB'.replace('.', ','),
        'chapters': [s['chapter'] for s in lesson['slides']],
        'slides': transcript,
    }
    (TRANSCRIPT_DIR / f'{slug}.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{slug}: {human_duration(t)}, {data["size"]}, {len(cues)} cues')


def main():
    spec = json.loads(SPEC.read_text(encoding='utf-8'))
    only = set(sys.argv[1:])
    voice = PiperVoice.load(VOICE)
    with tempfile.TemporaryDirectory() as d:
        for lesson in spec['lessons']:
            if not only or lesson['slug'] in only:
                build(lesson, voice, Path(d))


if __name__ == '__main__':
    main()
