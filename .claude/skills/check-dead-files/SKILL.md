---
description: 'Audit the repo for files that are no longer referenced by any markdown, HTML, SCSS, JS, YAML or config file. Walks images/, files/, assets/, _includes/, _layouts/, talkmap/, classifies findings into tiers (truly unreferenced / sample content / false positives), and prints a removal candidate list. Use periodically before structural cleanups, or when the user asks to "find unused files", "clean up the repo", or "what can I delete".'
argument-hint: ''
---

# Check dead files

Find files that look unreferenced and propose them for removal. Always tier the results — some "unreferenced" hits are actually critical (Jekyll-compiled SCSS, base layouts inherited via `layout: default`, etc.) and must NEVER be deleted.

## Step 1 — Enumerate candidate files

Walk these roots for files that COULD be referenced from content but might have been orphaned:

- `images/`
- `files/`
- `assets/`
- `_includes/`
- `_layouts/`
- `talkmap/`

For each found file, record its relative path and size.

## Step 2 — Build a search corpus

Read every text file in the repo (`.md`, `.html`, `.scss`, `.css`, `.js`, `.yml`, `.yaml`, `.json`, `.xml`, `.ipynb`, `.py`) into memory, except inside `.git/`, `_site/`, `node_modules/`, `.bundle/`, `.jekyll-cache/`, `.sass-cache/`.

## Step 3 — Cross-reference

For each candidate file, search the corpus for occurrences of:
- The file's basename (e.g. `bio-photo.jpg`)
- The relative path (e.g. `images/bio-photo.jpg`)

Skip self-references (a file's own content matching its own name).

A candidate is "unreferenced" if zero corpus files contain its basename or path.

This is what the audit run inline as a Python heredoc — keep that pattern (Python is on PATH and doesn't have PowerShell's case-insensitive JSON quirks for utf-8 file content).

## Step 4 — Verify suspicious hits

Some "unreferenced" files are actually critical. Before listing them as removal candidates, **verify the following exclusions** (always-keep list):

- **`assets/css/main.scss`** — Jekyll compiles to `main.css` (which IS referenced from `_includes/head.html`). The `.scss` is the source. NEVER delete.
- **`_layouts/default.html`** — base layout that all other layouts extend via `layout: default` in their front matter. Verify by `grep -l "layout: default" _layouts/*.html`. NEVER delete.
- **`_includes/head/custom.html`** — referenced by the head include indirectly; contains favicon/mstile/manifest links.
- **MM theme essentials** under `_includes/`: `head.html`, `footer.html`, `masthead.html`, `seo.html`, `scripts.html`, `sidebar.html`, `comments.html`, `comment.html`, `archive-single.html`, `archive-single-talk.html`, `archive-single-cv.html`, `archive-single-talk-cv.html`, `author-profile.html`, `breadcrumbs.html`, `browser-upgrade.html`, `category-list.html`, `tag-list.html`, `page__hero.html`, `page__taxonomy.html`, `paginator.html`, `post_pagination.html`, `read-time.html`, `social-share.html`, `feature_row`, `gallery`, `group-by-array`, `nav_list`, `toc`, `base_path`.
- **Anything under `_sass/vendor/`, `assets/js/vendor/`, `assets/js/plugins/`** — bundled theme dependencies.
- **Anything `_includes/footer/`, `_includes/head/`, `_includes/analytics-providers/`, `_includes/comments-providers/`** — theme partial folders.

For each candidate that's NOT in the always-keep list, also check whether it might be referenced via:
- `layout: <name>` in front matter (for files in `_layouts/`)
- A Liquid `{% include <name> %}` somewhere
- `_data/` files that mention it (e.g. `_data/authors.yml` lists `bio-photo.jpg` — do `grep -r <basename> _data/` to catch this)
- `_config.yml` settings (`author.avatar`, `og_image`, etc.)

## Step 5 — Report in tiers

Group findings into:

- **Tier A — Sample images from upstream theme** (high confidence safe): theme demo files like `image-alignment-*.jpg`, `paragraph-*.png`, `foo-bar-*.jpg`, `editing-talk.png`, `site-logo.png`, `bio-photo*.jpg` (if `_data/authors.yml` is also unused).
- **Tier B — Unused infrastructure**: `.css`/`.js`/layouts/includes that no page references.
- **Tier C — Dormant directories**: things excluded from the build (per `_config.yml`'s `exclude:` list) but still in the repo. Confirm before suggesting deletion since user may want to keep source.
- **Tier D — Sample content that DOES render**: items in `_portfolio/`, `_talks/`, `_posts/` that come from the upstream theme. Removing these makes their URLs 404. Note this risk.
- **Tier E — Files that LOOK unreferenced but MUST stay**: false positives from the always-keep list above. Mention these explicitly so the user knows they were checked.

## Step 6 — Present the report and wait for user decision

Format as a markdown table per tier with: size, path, brief reason. End with "Pick which tiers / specific files to delete (e.g. 'A, B' or 'all of A and the talkmap dir from C'). I'll `git rm` them in one commit."

Do NOT auto-delete. The user always decides per tier or per file.

## Step 7 — Apply approved deletions

Use `git rm` (NOT `Remove-Item`) to remove + stage in one step. Then commit with a descriptive message and push per [[workflow]] / [[commit-direct]].
