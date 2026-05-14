---
description: 'Replace Google Drive /preview iframes on a project page with self-hosted MP4 <video> tags. Drive iframes have non-deterministic player chrome that varies per cell on each refresh and letterboxes the video; self-hosting eliminates both. Use when the user reports inconsistent Drive video sizing, asks to "self-host the videos", or has just downloaded the MP4s into images/. Prereqs: user has the local MP4 files (or is willing to download them from Drive).'
argument-hint: '[optional: paper slug like 2025-12-24-TAC2025]'
---

# Self-host Drive videos

Replace `<iframe src="https://drive.google.com/file/d/<id>/preview...">` blocks on a project page with `<video src="/images/<slug>/<file>.mp4" autoplay loop muted playsinline></video>` blocks. Eliminates Drive's player inconsistencies (see [[theme]] rule #9 and [[media]]).

## Step 1 — Identify the target page

If `$ARGUMENTS` matches a `_publications/` filename slug (e.g. `2025-12-24-TAC2025`), use that. Otherwise:
- If the user just mentioned a paper, use that.
- Otherwise ask which `_publications/*.md` page to convert.

The folder for the local MP4s should be `images/<short-paper-slug>/` — e.g. `images/tac2025/` for `_publications/2025-12-24-TAC2025.md`. Use the venue acronym + year, lowercase.

## Step 2 — Inventory current Drive iframes on the page

Grep the target file for `iframe` occurrences and list each with its Drive file ID and the surrounding context (table row label / heading) so you can match each iframe to a meaningful filename.

## Step 3 — Verify MP4 files are in place

`Get-ChildItem images/<slug>/ -File` to list what's there. The user should have already dropped the files. If a file is missing for one of the iframes, ask the user (don't guess at filenames).

## Step 4 — Map each iframe to a local MP4

Build a table:

| Cell context (e.g. `\|u_k\| ≤ 5°`, `d_min = (w-l_2)/32`) | Drive ID | Local filename |
|---|---|---|
| ... | `1BpeaasxTTc-...` | `d_min_0.0469_u_max_5_deg.mp4` |

If filenames are unambiguous (encode the variation), the mapping is mechanical. If ambiguous, **ask the user to confirm the mapping before writing edits** — easy to scramble cells otherwise.

## Step 5 — Rewrite the markup

Replace each `<iframe src="https://drive.google.com/file/d/<id>/preview..." allowfullscreen allow="autoplay"></iframe>` with:

```html
<video src="/images/<slug>/<file>.mp4" autoplay loop muted playsinline></video>
```

(`autoplay loop muted playsinline` makes it GIF-like — no controls, no chrome, instant loop, works on mobile autoplay.)

If the surrounding wrapper is `<div class="video-container">` (the old padding-bottom hack wrapper), check whether the page-level CSS is also gridded. For comparison grids using `<div class="cis-grid__cell">` etc., the existing inline `<style>` already handles `<video>` sizing — add a selector if needed:

```css
.cis-grid__cell iframe,
.cis-grid__cell video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
```

## Step 6 — Verify and commit

- `git status --short` to confirm the markdown change + new MP4 files are staged.
- `git add` the page + the new MP4s.
- Commit with a message like "TAC2025: replace drive iframes with self-hosted MP4 videos".
- Push per [[commit-direct]].

## What to do if the user hasn't downloaded the MP4s yet

Print the Drive download instructions:

> For each Drive video on the page:
> 1. Open `https://drive.google.com/file/d/<id>/view` in a browser.
> 2. Click the download icon (down-arrow) in the top right of Drive's player.
> 3. Save into `images/<paper-slug>/` with a descriptive name.
>
> Once all files are in place, re-run `/self-host-drive-video <slug>`.

Don't proceed with the markup change until the files exist on disk — the iframes still serve content, but `<video>` tags would 404.
