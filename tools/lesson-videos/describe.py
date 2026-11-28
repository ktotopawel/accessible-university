"""Make a version with extended audio description of an existing (hand-made) lesson video.

Reads audio-description.json. For every video: at each insert point the frame is frozen,
the description lines are read by the Piper voice (pl_PL-gosia-medium), then the video goes on.
Writes
  public/video/<output>.mp4          H.264 + AAC, faststart
  public/video/<output>.pl.vtt       original captions shifted + captions of the description
  src/data/transcripts/<slug>-ad.json  duration and file size for the lesson page

Runs inside the Docker image from ./Dockerfile; see README.md.
"""

import json
import re
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

from piper import PiperVoice

from generate import ROOT, TRANSCRIPT_DIR, VIDEO_DIR, VOICE, caption_lines, human_duration, ts

SPEC = Path(__file__).with_name('audio-description.json')
PAD_BEFORE, GAP, PAD_AFTER = 0.4, 0.35, 0.6  # seconds of silence around / between description lines


def probe(path):
    out = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type,width,height,r_frame_rate,sample_rate',
         '-show_entries', 'format=duration', '-of', 'json', str(path)],
        check=True, capture_output=True, text=True).stdout
    info = json.loads(out)
    v = next(s for s in info['streams'] if s['codec_type'] == 'video')
    a = next(s for s in info['streams'] if s['codec_type'] == 'audio')
    num, den = map(int, v['r_frame_rate'].split('/'))
    return {'w': v['width'], 'h': v['height'], 'fps': num / den, 'rate': int(a['sample_rate']),
            'duration': float(info['format']['duration'])}


def parse_time(s):
    h, m, sec = s.split(':')
    return int(h) * 3600 + int(m) * 60 + float(sec)


def read_vtt(path):
    """[(start, end, text)] from a simple WebVTT file (numbered cues, no styling)."""
    cues = []
    for block in re.split(r'\n\s*\n', path.read_text(encoding='utf-8')):
        lines = [l for l in block.strip().splitlines() if l]
        for i, line in enumerate(lines):
            m = re.match(r'([\d:.]+)\s+-->\s+([\d:.]+)', line)
            if m:
                cues.append((parse_time(m[1]), parse_time(m[2]), ' '.join(lines[i + 1:])))
                break
    return cues


def synth_insert(voice, lines, tmp, name):
    """One WAV with all lines of an insert; returns (path, duration, [(offset, dur, show)])."""
    rate = voice.config.sample_rate
    frames = bytearray()
    parts, t = [], 0.0

    def silence(sec):
        frames.extend(b'\x00\x00' * int(rate * sec))

    silence(PAD_BEFORE)
    t += PAD_BEFORE
    for k, line in enumerate(lines):
        say = line['say'] if isinstance(line, dict) else line
        show = line['show'] if isinstance(line, dict) else line
        part = tmp / f'{name}-{k}.wav'
        with wave.open(str(part), 'wb') as wf:
            voice.synthesize_wav(say, wf)
        with wave.open(str(part), 'rb') as rf:
            data = rf.readframes(rf.getnframes())
        dur = len(data) / (rate * 2)
        parts.append((t, dur, show))
        frames.extend(data)
        t += dur
        if k < len(lines) - 1:
            silence(GAP)
            t += GAP
    silence(PAD_AFTER)
    t += PAD_AFTER
    path = tmp / f'{name}.wav'
    with wave.open(str(path), 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(rate)
        wf.writeframes(bytes(frames))
    return path, len(frames) / (rate * 2), parts


def build(video, voice, tmp):
    src = VIDEO_DIR / f"{video['source']}.mp4"
    info = probe(src)
    inserts = sorted(video['inserts'], key=lambda i: i['at'])
    fps, w, h, rate = info['fps'], info['w'], info['h'], info['rate']

    # Description audio and still frames
    synthesized = []
    for n, ins in enumerate(inserts):
        wav, dur, parts = synth_insert(voice, ins['lines'], tmp, f'ad{n}')
        still = tmp / f'still{n}.png'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f"{max(ins['at'] - 0.05, 0):.3f}", '-i', str(src),
                        '-frames:v', '1', str(still)], check=True)
        synthesized.append({'at': ins['at'], 'wav': wav, 'dur': dur, 'parts': parts, 'still': still})

    # One filter graph: original pieces and frozen frames with descriptions, alternating, then concat.
    inputs = ['-i', str(src)]
    for s in synthesized:
        inputs += ['-loop', '1', '-framerate', f'{fps:g}', '-t', f"{s['dur']:.3f}", '-i', str(s['still']), '-i', str(s['wav'])]
    vnorm = f'scale={w}:{h},fps={fps:g},format=yuv420p,setsar=1'
    anorm = f'aresample={rate},aformat=channel_layouts=mono'
    chains, labels = [], []
    bounds = [0.0] + [s['at'] for s in synthesized] + [info['duration']]
    for i in range(len(bounds) - 1):
        a, b = bounds[i], bounds[i + 1]
        chains.append(f'[0:v]trim=start={a:.3f}:end={b:.3f},setpts=PTS-STARTPTS,{vnorm}[v{i}]')
        chains.append(f'[0:a]atrim=start={a:.3f}:end={b:.3f},asetpts=PTS-STARTPTS,{anorm}[a{i}]')
        labels.append(f'[v{i}][a{i}]')
        if i < len(synthesized):
            vi, ai = 1 + 2 * i, 2 + 2 * i
            chains.append(f'[{vi}:v]{vnorm}[sv{i}]')
            chains.append(f'[{ai}:a]{anorm}[sa{i}]')
            labels.append(f'[sv{i}][sa{i}]')
    chains.append(f"{''.join(labels)}concat=n={len(labels)}:v=1:a=1[v][a]")

    out = VIDEO_DIR / f"{video['output']}.mp4"
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', ';'.join(chains),
                    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
                    '-tune', 'stillimage', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', str(out)], check=True)

    # Captions: original cues shifted by the inserts before them + the description's own cues.
    def shift(t):
        return t + sum(s['dur'] for s in synthesized if s['at'] <= t)

    cues = [(shift(a), shift(b), text) for a, b, text in read_vtt(VIDEO_DIR / f"{video['source']}.pl.vtt")]
    for s in synthesized:
        start = shift(s['at']) - s['dur']  # the insert begins where the original stopped
        for k, (off, dur, show) in enumerate(s['parts']):
            cues.append((start + off, start + off + dur, f'Audiodeskrypcja: {show}' if k == 0 else show))
    cues.sort()
    with (VIDEO_DIR / f"{video['output']}.pl.vtt").open('w', encoding='utf-8') as f:
        f.write(f"WEBVTT - {video['title']} – wersja z audiodeskrypcją (napisy po polsku)\n\n")
        for n, (a, b, text) in enumerate(cues, 1):
            f.write(f'{n}\n{ts(a)} --> {ts(b)}\n' + '\n'.join(caption_lines(text)) + '\n\n')

    total = probe(out)['duration']
    size = out.stat().st_size / 1_000_000
    data = {
        '_generated': 'by tools/lesson-videos/describe.py from audio-description.json – do not edit by hand',
        'duration': human_duration(total),
        'size': f'{size:.1f} MB'.replace('.', ','),
    }
    TRANSCRIPT_DIR.mkdir(parents=True, exist_ok=True)
    (TRANSCRIPT_DIR / f"{video['slug']}-ad.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"{video['slug']}: {data['duration']}, {data['size']}, {len(synthesized)} descriptions, {len(cues)} cues")


def main():
    spec = json.loads(SPEC.read_text(encoding='utf-8'))
    only = set(sys.argv[1:])
    voice = PiperVoice.load(VOICE)
    with tempfile.TemporaryDirectory() as d:
        for video in spec['videos']:
            if not only or video['slug'] in only:
                build(video, voice, Path(d))


if __name__ == '__main__':
    main()
