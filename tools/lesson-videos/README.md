# Generated lesson videos

Short slide-show videos for the mock lessons (everything except "Liczby zespolone").
One source file, `lessons.json`, produces the video **and** everything the lesson page needs,
so captions and transcript always match the video:

| Output | Path |
|---|---|
| Video (H.264 + AAC, 1280×720) | `public/video/<file>.mp4` |
| Polish captions | `public/video/<file>.pl.vtt` |
| Poster (first slide) | `public/video/<file>-poster.jpg` |
| Chapters, transcript, duration, size | `src/data/transcripts/<slug>.json` (imported by `src/data/lessons.js`) |

Slides look like the "Liczby zespolone" video (course bar, chapter list, slide counter).
Narration is synthesised with [Piper](https://github.com/OHF-Voice/piper1-gpl) and the Polish voice
`pl_PL-gosia-medium`. The narrator reads everything that is on the slides, so no separate
audio description is needed. Use `{ "say": …, "show": … }` when the spoken form differs from
the caption (numbers, e-mail addresses).

## Run (Docker, from the repo root)

```powershell
docker build -t au-lesson-videos tools/lesson-videos
docker run --rm -v "${PWD}:/work" au-lesson-videos python tools/lesson-videos/generate.py
```

Pass lesson slugs to regenerate only some of them, e.g. `... generate.py hand-hygiene`.

## Audio description for hand-made videos

`describe.py` makes a version with **extended audio description** of an existing video
(now: "Liczby zespolone"). `audio-description.json` lists points in the original (seconds, between
captions) and the lines to read there: the frame is frozen, the Piper voice reads the lines, then the
video goes on. Output: `public/video/<output>.mp4`, `public/video/<output>.pl.vtt` (original captions
shifted + the description) and `src/data/transcripts/<slug>-ad.json` (duration, size).

```powershell
docker run --rm -v "${PWD}:/work" -w /work/tools/lesson-videos au-lesson-videos python describe.py
```
After regenerating, commit the files in `public/video/` and `src/data/transcripts/`.
