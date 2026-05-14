# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Additional topic-scoped rules live in `.claude/rules/`:
- `workflow.md` — push direct to master, watch the GH Actions deploy, iterate if it breaks; PowerShell gotchas (always loaded).
- `permalinks.md` — `permalink:` fields are immutable; use `redirect_from:` if a URL must change (loaded when editing any collection or page file, or `_config.yml`).
- `publications.md` — dual-edit rule for `_pages/publications.md`, color palette, author-name wrapping (loaded when editing `_publications/` or the Publications page).
- `theme.md` — SCSS / layout overhaul guidance, single-stylesheet + dark-theme attribute selector, no `:has()` with iframes, no Drive iframes for video grids (loaded when editing `_sass/`, `_layouts/`, `_includes/`, `assets/`, or `_config.yml`).
- `media.md` — image/video conventions: `images/teaser_images/`, self-hosted MP4s in `images/<paper-slug>/`, `<video>` not Drive `<iframe>` (loaded when editing publication pages, projects.md, or media-related SCSS/CSS).

Project skills in `.claude/skills/`:
- `/add-publication <paste BibTeX>` — scaffolds a new entry: creates `_publications/YYYY-MM-DD-<slug>.md` and inserts the matching `<li>` block at the top of the right section in `_pages/publications.md`. Cross-checks author count vs arXiv; reuses known coauthor profile URLs already in the repo.
- `/check-links` — audits every `<img>`, `<video>`, `<a href>`, and markdown link against files in `images/` and `files/`. Reports broken refs and orphan files. Run after any rename / move / delete of assets.
- `/check-permalinks` — audits the current permalink set against HEAD and against the inventory in `.claude/rules/permalinks.md`. Flags any URL that has been removed, changed, or added. Run before pushing structural changes.
- `/check-dead-files` — audits the repo for files no longer referenced by any markdown/HTML/SCSS/JS/YAML. Tiered output (truly unreferenced / sample content / false positives); never auto-deletes.
- `/scholar-update` — syncs `_publications/` and `_pages/publications.md` against your OpenAlex record (looked up by ORCID from `_config.yml`). Detects new papers, title changes, venue transitions (preprint → conference → journal), DOI additions, coauthor changes. Prints a structured diff; applies only the items you approve. Uses OpenAlex (free, JSON, no key) instead of Google Scholar (no API, blocks scraping).
- `/self-host-drive-video [paper-slug]` — replaces Drive `/preview` iframes on a project page with self-hosted MP4 `<video>` tags (the user drops the files in `images/<slug>/`). Eliminates Drive's non-deterministic player chrome.
- `/commit-direct [msg]` — commits and pushes straight to master. The GH Actions workflow builds + deploys; if build fails, the previous deploy stays live. Defaults to `git commit -F .git/COMMIT_MSG_TMP` (PowerShell HEREDOCs choke on parens / angle brackets). Verifies post-commit `git status` is clean before pushing.

## What this repo is

Xiao Li's personal academic website (`XiaoLiSean.github.io`), built on the [AcademicPages](https://github.com/academicpages/academicpages.github.io) fork of the Minimal Mistakes Jekyll theme. The site is hosted on GitHub Pages — pushing to `master` triggers the GitHub Pages build; there is no separate CI. Edits are almost always to content (markdown, YAML), not to theme code.

## Local development

**Ruby/bundler is NOT installed on this machine.** Visual verification happens on the live site after deploy. The push-and-iterate workflow (see `.claude/rules/workflow.md`) handles this: push to master → GH Actions builds + deploys → check live site → if broken, fix and push again.

For someone who wants a local Jekyll dev server (not the current setup):

```sh
bundle install
bundle exec jekyll liveserve    # http://localhost:4000 with auto-reload
```

`_config.dev.yml` is an override for local dev (localhost URL, disabled analytics, expanded SCSS). To use it: `bundle exec jekyll serve --config _config.yml,_config.dev.yml`. Jekyll does **not** auto-reload `_config.yml` — restart the server after changing it. On Windows the `wdm` gem (in `Gemfile`) is needed for file-watching; it's gated by `Gem.win_platform?`.

## Content model

Content is organized as Jekyll [collections](https://jekyllrb.com/docs/collections/) declared in `_config.yml` under `collections:`. Each collection is a folder of markdown files with YAML front matter:

| Folder | Permalink | Notes |
|---|---|---|
| `_publications/` | `/publication/:path/` | Filenames are `YYYY-MM-DD-<slug>.md`. Front matter needs `title`, `collection: publications`, `permalink`. **The public Publications page is hand-curated, not auto-generated — see `.claude/rules/publications.md`.** |
| `_portfolio/` | `/portfolio/:path/` | |
| `_talks/` | `/talks/:path/` | Uses the `talk` layout |
| `_teaching/` | `/teaching/:path/` | (Collection declared; the public `_pages/teaching.html` lists items inline rather than rendering the collection) |
| `_posts/` | (default) | Blog posts; not surfaced in nav by default |
| `_pages/` | per-file `permalink:` | Standalone pages: `about.md`, `publications.md`, `projects.md`, `teaching.html`, `cv.md`, etc. |

Top-nav links are configured in `_data/navigation.yml`. Author/profile sidebar data is in `_config.yml` under `author:` (and `_data/authors.yml` for multi-author overrides). Files in `files/` are served at `https://xiaolisean.github.io/files/...` — drop PDFs there and link with absolute paths.

## `markdown_generator/` (optional helper, not part of the build)

Contains Jupyter notebooks and `.py` scripts (`publications.py`, `talks.py`, `pubsFromBib.py`) that convert TSV / BibTeX into collection markdown files. These are run manually outside the Jekyll build; the Jekyll site never imports them. The TSVs there are upstream samples — Xiao's actual publications are written by hand in `_publications/`, so these scripts are dormant.

`talkmap.py` / `talkmap.ipynb` likewise geocode `_talks/*.md` to produce a static cluster map; only re-run if `talkmap_link` in `_config.yml` is flipped to true.

## Theme code

`_layouts/`, `_includes/`, `_sass/`, `assets/` come from the Minimal Mistakes / AcademicPages upstream. See `.claude/rules/theme.md` for the rules that apply when editing them.

### Custom additions added this overhaul

- **Single-stylesheet dark mode.** The site uses ONE compiled `assets/css/main.css`. Dark theme rules live in `_sass/_dark-theme.scss` scoped to `html[data-theme="dark"]` (attribute-selector specificity). The toggle in `_includes/dark-mode-toggle.html` only flips that attribute on `<html>`. Default theme is decided by local sunset/sunrise computed in `_includes/head.html` from the visitor's local time (no geolocation prompt). Don't reintroduce the dual-stylesheet `link.disabled` swap — it's fragile and we already abandoned it twice.
- **Custom SCSS partials** (in `_sass/`, imported from `assets/css/main.scss`): `_dark-theme.scss` (dark mode overrides), `_publication-card.scss` (publications page card layout), `_project-gallery.scss` (projects page grid + modal).
- **`.logo-plate` class**: any school/company logo (sjtu, uofm, tri) wrapped in `<div class="logo-plate">` gets a white plate (invisible on white page) in light mode, light gray plate (visible) in dark mode. Use the same pattern for any future logos.

### Custom directories added this overhaul

- **`images/teaser_images/`** — small per-paper teaser images for the publications page card layout. Naming: lowercase venue acronym + year (e.g. `cdc_2025.gif`, `tcst_2026.jpg`, `iv_2025.png`).
- **`images/<paper-slug>/`** — self-hosted MP4 videos used in per-paper project pages, replacing Drive iframes. Examples: `images/tac2025/`, `images/l4dc2024/`, `images/tcst2024/`.
- **`.github/workflows/jekyll.yml`** — GH Actions builds + deploys to Pages. Pages source must be set to "GitHub Actions" in repo settings (one-time UI step).
