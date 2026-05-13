# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Additional topic-scoped rules live in `.claude/rules/`:
- `workflow.md` — branch-vs-direct-push, mandatory liveserve verification (always loaded).
- `permalinks.md` — `permalink:` fields are immutable; use `redirect_from:` if a URL must change (loaded when editing any collection or page file, or `_config.yml`).
- `publications.md` — dual-edit rule for `_pages/publications.md`, color palette, author-name wrapping (loaded when editing `_publications/` or the Publications page).
- `theme.md` — SCSS / layout overhaul guidance, prefer-custom-files, subagent usage (loaded when editing `_sass/`, `_layouts/`, `_includes/`, `assets/`, or `_config.yml`).

Project skills in `.claude/skills/`:
- `/add-publication <paste BibTeX>` — scaffolds a new entry: creates `_publications/YYYY-MM-DD-<slug>.md` and inserts the matching `<li>` block at the top of the right section in `_pages/publications.md`.
- `/check-links` — audits every `<img>`, `<video>`, `<a href>`, and markdown link against files in `images/` and `files/`. Reports broken refs and orphan files. Run after any rename / move / delete of assets.
- `/check-permalinks` — audits the current permalink set against HEAD and against the inventory in `.claude/rules/permalinks.md`. Flags any URL that has been removed, changed, or added. Run before pushing structural changes.
- `/commit-direct [msg]` — commits and pushes straight to master (live deploy). Refuses if the change touches theme/infra paths. Use for pure content edits.
- `/commit-pr [branch-name]` — commits on a feature branch, pushes, prints the PR-create URL. The PR triggers the GH Actions build job (compile-check, no deploy). Use for theme/infra changes or any time you want a build check before deploy.

## What this repo is

Xiao Li's personal academic website (`XiaoLiSean.github.io`), built on the [AcademicPages](https://github.com/academicpages/academicpages.github.io) fork of the Minimal Mistakes Jekyll theme. The site is hosted on GitHub Pages — pushing to `master` triggers the GitHub Pages build; there is no separate CI. Edits are almost always to content (markdown, YAML), not to theme code.

## Local development

Jekyll/Ruby stack (the repo also has a leftover `package.json` for the upstream theme's JS uglify pipeline — it is not used here):

```sh
bundle install                  # first-time setup; delete Gemfile.lock if it errors
bundle exec jekyll liveserve    # builds + serves on http://localhost:4000 with auto-reload
```

`_config.dev.yml` is an override for local dev (sets `url: http://localhost:4000`, disables analytics, expands SCSS). To use it: `bundle exec jekyll serve --config _config.yml,_config.dev.yml`.

Note: Jekyll does **not** auto-reload `_config.yml` — restart the server after changing it.

On Windows the `wdm` gem (in `Gemfile`) is required for file-watching; it is gated by `Gem.win_platform?` so the same Gemfile works on Linux/macOS.

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
