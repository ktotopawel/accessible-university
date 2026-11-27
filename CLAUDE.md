# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, mobile-first **mock** of an accessible university website ("Akademia Śląska") for a university design course. Plain HTML + one CSS file + one small vanilla JS file. No framework, no package manager, no build step, no test suite, no linter. All user-facing content is in **Polish** (`lang="pl"`).

Remote: `https://github.com/ktotopawel/accessible-university` (branch `main`).

## Commands

```bash
# Serve locally (any static server works; pages use relative links)
python3 -m http.server 8000

# Container build/run (nginx:1.27-alpine)
docker build -t accessible-university .
docker run --rm -p 8080:80 accessible-university
```

The Dockerfile copies every top-level `*.html` (plus `css/` and `js/`), so new pages are picked up automatically, but pages must stay in the repo root (flat structure). The image bakes files in, so rebuild after every edit. `.dockerignore` excludes `*.md`.

After changing any page, `css/style.css` or `js/a11y.js`, run a WCAG 2.2 audit on the affected files and fix what it reports before calling the work done. If the local read-only `wcag-auditor` subagent exists (`.claude/agents/wcag-auditor.md`; `.claude/` is gitignored, so it is not part of the repo), use it.

There are no automated tests. Accessibility is checked manually / with external tools (axe, Lighthouse, keyboard-only, NVDA/VoiceOver/TalkBack, 200–400% zoom, 320 px width) — see "Jak sprawdzamy" in `ACCESSIBILITY-DECISIONS.md`.

## Architecture

All pages (the six main-menu pages plus the video-course pages and the timetable pages `schedule*.html`, sub-pages of Studia whose main-menu link carries `aria-current="true"`) share **no templates or includes** — header, toolbar, nav and footer are copy-pasted into each file. Any change to shared chrome must be repeated in every page. The video-course section (`courses.html` hub → `courses-<category>.html` → `lesson-*.html`) additionally repeats a `nav.subnav` category bar in the same order on each page; each page has exactly one `aria-current="page"` (last breadcrumb item, or the main-menu "Kursy wideo" link on the hub); other "you are here" markers (main-menu section, category bar) use `"true"`, the current lesson in a lesson list uses `"step"`. Things that must stay identical across pages:

- The inline `<script>` in `<head>`: adds the `js` class and restores `text-size-2/3` / `high-contrast` classes from `localStorage` (keys `as-text-size`, `as-high-contrast`) *before first paint* to avoid a flash. It is duplicated in every page; `js/a11y.js` (loaded with `defer`) then syncs `aria-pressed` and handles clicks via one delegated listener on `document`.
- Skip link → `header` (toolbar + logo + `nav.main-nav` with the same 6 items) → `main#main-content` → `footer.site-footer` containing the "Potrzebujesz pomocy?" help block (same place on every page, WCAG 3.2.6).
- Per-page differences: `<title>` ("Strona – Akademia Śląska") and which nav link carries `aria-current="page"`.

### Theming mechanism (`css/style.css`)

All colors are CSS custom properties on `:root`. The accessibility toolbar works by toggling classes on `<html>`:

- `html.text-size-2` / `text-size-3` set `font-size` to 125% / 150%; everything else is in `rem`, so the whole page scales.
- `html.high-contrast` overrides the color variables (black bg, white text, yellow accent). Components should use the variables, never hard-coded colors — exceptions are intentional: the `.contrast-toggle` button is always black/yellow, and `.placeholder` is pink (`#ff69b4`) to mark unfinished content.
- `@media (prefers-contrast: more)` and `@media (forced-colors: active)` are handled separately from the toggle.
- The toolbar is `display: none` unless `html.js` is set (no-JS users never see dead buttons).

Clickable tiles use the "stretched link" pattern: one `<a>` per tile with an `::after` covering the tile; focus ring is moved onto the pseudo-element.

## Conventions that are easy to break

`ACCESSIBILITY-DECISIONS.md` (Polish) is the source of truth for design decisions and the target (**WCAG 2.2 AA, text contrast AAA / 7:1**). Read it before changing markup or styles. Notable constraints:

- No sticky header (would obscure focused elements, 2.4.11); no hamburger/submenus; no carousels, animations, autoplay, CAPTCHAs, or accessibility overlay widgets.
- Interactive targets ≥ 44 px (`2.75rem`); no horizontal scroll from 320 px; don't disable pinch zoom.
- Links in text stay underlined; the current nav item is marked by underline plus `aria-current`, not color alone.
- Phones/e-mails are `tel:`/`mailto:` links; images need alt text; videos need captions + transcript.
- Unfinished content is a `<div class="placeholder">` describing what goes there — keep that convention rather than inventing fake content.
- Poppins is loaded from Google Fonts (matches akademiaslaska.pl); the decisions doc names Atkinson Hyperlegible as the fallback if Poppins' similar "I"/"l" hurts testing.

`ACCESSIBILITY-FLOWCHART.md` is a Mermaid mind map of project scope/user groups (not code-related).
