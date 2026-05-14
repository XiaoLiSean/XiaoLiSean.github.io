---
paths:
  - "_publications/**"
  - "_pages/projects.md"
  - "_pages/publications.md"
  - "assets/css/video.css"
  - "_sass/_publication-card.scss"
  - "_sass/_project-gallery.scss"
---

# Media (images, videos, iframes) rules

Conventions hammered out across multiple iterations of the publications page, project gallery, and per-paper project pages.

## File locations

- **`images/teaser_images/`** — small teaser images/GIFs/MP4s used in the publications page card layout. Naming: lowercase venue acronym + year (`cdc_2025.gif`, `tcst_2026.jpg`, `iv_2025.png`, `aca_2023.png`). Also `cis.gif`, `seannet.png` when the paper is better identified by a project name. The folder name **must not have spaces** — URL-encoding is ugly and fragile.

- **`images/<paper-slug>/`** — self-hosted MP4 videos for that paper's project page (e.g. `images/tac2025/`, `images/l4dc2024/`, `images/tcst2024/`). Use descriptive filenames that encode the variation (e.g. `d_min_0.0469_u_max_5_deg.mp4`).

- **`images/teaser_images/<venue>.mp4`** is fine for short loop teasers used as cards (e.g. `l4dc_2024.mp4`).

## Embed `<video>`, not Drive `<iframe>`

Always prefer self-hosted `<video>` tags over Google Drive `/preview` iframes:

```html
<video src="/images/<slug>/<file>.mp4" autoplay loop muted playsinline></video>
```

Why: Drive's player has non-deterministic chrome state on load (different cells render in different states on each refresh — see [[theme]] rule #9). Drive also adds its own player UI that letterboxes the video. Self-hosting eliminates both problems.

If a Drive iframe is unavoidable (e.g. waiting for the user to download), wrap in `.video-container` (16:9 padding-bottom hack from `assets/css/video.css`) and accept the inconsistency.

## Inline `<style>` and `<script>` in publication pages

Pages like `_publications/2025-12-24-TAC2025.md` embed inline `<style>` and `<script>` blocks. Two iron rules:

- **`<style>` blocks**: scope rules to a page-specific class (e.g. `.cis-grid`) so they don't bleed into other pages. Don't use `table, th, td { ... }` global selectors in inline styles.
- **`<script>` blocks**: use only `/* */` block comments — Jekyll's `compress_html` strips newlines and `//` comments will swallow code (see [[theme]] rule #6).

## Layout patterns

- **Publication cards** (`_pages/publications.md`): 2-column flex card with teaser on left (`.pub-teaser`, fixed 360px width, max-height 200px, white background with `1px solid #333` border, `object-fit: contain` so the full image is visible). Defined in `_sass/_publication-card.scss`. Engine section uses plain bullets, not cards (per user preference).

- **Project gallery** (`_pages/projects.md`): CSS grid of `.project-card`s, each clickable to open a `<dialog class="project-modal">` with the existing slideshow inside. Native `<dialog>` + `showModal()` is required so the modal sits in the browser's top layer above everything (no z-index war with the masthead). Defined in `_sass/_project-gallery.scss`.

- **Comparison video grids** (TAC2025 etc.): use **CSS Grid divs**, not `<table>`. Tables don't honor `position: relative` or `aspect-ratio` reliably for absolutely-positioned children, and `:has()`-based table styling races with iframe load timing. Each video cell uses `aspect-ratio: 16 / 9; position: relative` and the `<video>` is `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain`.

## Color and dark-mode

Logo plates wrapping any school/company logo use `class="logo-plate"` with inline `background:#ffffff` (invisible on white in light mode). The dark-mode override in `_sass/_dark-theme.scss` swaps the plate to `#e0e0e0` (light gray, visible against dark page).
