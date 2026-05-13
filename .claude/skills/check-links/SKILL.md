---
description: 'Audit the site for broken asset references. Greps every <img>, <video>, <a href>, and markdown link in content files, cross-references with files actually present in images/ and files/, and reports broken refs (link points to a missing file) and orphans (file exists but nothing references it). Use when the user asks to "check links", "audit links", "find broken images", "find dead links", or after any large file rename / move / delete.'
argument-hint: '[optional: path to scope the check, e.g. _publications/]'
---

# Check links

Run a hyperlink-integrity audit against the site. Report broken refs and orphan files. Do **not** auto-fix — the user should review each finding.

## Step 1 — Collect all asset references

Grep across content directories (NOT theme files in `_layouts/`, `_includes/`, `_sass/`, `assets/`). If `$ARGUMENTS` is non-empty, scope the search to that path; otherwise scan `_pages/`, `_publications/`, `_portfolio/`, `_talks/`, `_teaching/`, `_posts/`.

Patterns to extract URLs from:

- `<img src="URL"` — HTML image tag
- `<video src="URL"` and `<source src="URL"` — HTML video tags
- `<iframe src="URL"` — embeds (Drive videos etc — only flag if URL is local)
- `<a href="URL">` — downloadable assets (PDFs in `files/`, code links, etc)
- `![alt](URL)` — markdown image syntax
- `[text](URL)` — markdown link syntax

For each match, capture: the file the ref appears in, the line number, the raw URL, and the surrounding tag/context.

## Step 2 — Resolve each URL to a local path

Classify and normalize:

- **External** (`http://` or `https://` to a *non*-`xiaolisean.github.io` host, or `mailto:`, `tel:`): skip — out of scope for this audit.
- **Site-absolute pointing at our own domain** (`http://XiaoLiSean.github.io/...` or `https://xiaolisean.github.io/...`): strip the host prefix → local path.
- **Root-relative** (starts with `/`): strip the leading slash → local path.
- **Anchor-only** (`#section`): skip — fragments resolve client-side.
- **Page permalink** (e.g. `/publication/2024-12-16-CDC2024`, `/projects/`): resolve against the permalink inventory in `.claude/rules/permalinks.md` — flag if the URL doesn't match any current permalink.
- **Relative paths** (no leading `/`, no scheme): resolve relative to the file's directory.

## Step 3 — Cross-reference

For each resolved local path:

- **Asset paths** (under `images/`, `files/`, `assets/`): check `Test-Path` (or `ls`) — does the file exist?
- **Page paths** (no file extension or `.html`): cross-check against the permalink inventory in `.claude/rules/permalinks.md`. If you don't find a match, the link is broken.

## Step 4 — Find orphans

Walk `images/` and `files/` directories, list every file. For each, check if **anything** in the content directories references it. Files with zero references are orphans.

Edge case: don't flag intentional template assets (e.g. `images/profile.jpg` is referenced via `_config.yml: author.avatar` rather than a `<img>` tag). Cross-check `_config.yml` and `_data/` for any string match against the candidate orphan's filename before flagging.

## Step 5 — Report

Use a structured markdown report. Sections:

### Broken refs
Group by source file. For each:
```
_pages/research.md:70  <img>  http://XiaoLiSean.github.io/images/OptiTrack Localization.gif
  → file does not exist; closest match: images/projects/OptiTrack Localization.mp4
```
Suggest the closest matching file (by basename) for each broken ref so the user can decide if it's a path typo or a genuine missing asset.

### Orphan files
Group by directory:
```
images/projects/
  stereoCCTV.gif (28.0 MB) — never referenced
  monoCCTV.gif (7.0 MB) — never referenced
```
Include file size — fat orphans are higher-priority cleanup targets.

### Summary
```
Scanned N files, found M asset refs.
✓ N valid
✗ N broken
⚠ N orphans (XX MB total)
```

## Step 6 — Don't auto-fix

End with: "Review each finding above. To fix a broken ref, edit the file. To remove an orphan, `git rm <path>`."

Do **not** edit files automatically — the user should decide whether each broken ref is a typo (path fixable) or a genuine missing asset (needs upload), and whether each orphan should be deleted vs. linked to from somewhere new.
