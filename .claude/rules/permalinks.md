---
paths:
  - "_pages/**"
  - "_publications/**"
  - "_portfolio/**"
  - "_talks/**"
  - "_teaching/**"
  - "_posts/**"
  - "_config.yml"
---

# Permalinks rule

**Never modify the `permalink:` field in any front matter, and never change `permalink:` patterns under `collections:` in `_config.yml`.** Live URLs are an external contract — bookmarks, citations, search-engine indexes, and inbound links from other academic sites all depend on them. A "rename" or "tidy-up" of a permalink silently breaks all of those.

**Why:** This site has been live for years; publication URLs in particular are referenced from CVs, scholar profiles, talk slides, and emails. URL stability matters more than URL aesthetics.

**How to apply:**

- When editing a file in `_pages/`, `_publications/`, `_portfolio/`, `_talks/`, or `_teaching/`, treat the `permalink:` line as immutable. Edit the body, edit the title, edit the layout — but don't touch the permalink.
- When editing `_config.yml`, do not change `collections.<name>.permalink` patterns (currently `/:collection/:path/`) or the global `permalink:` (`/:categories/:title/`).
- If a permalink genuinely *must* change (e.g., a typo in a slug published five minutes ago, before anyone could link to it), make it explicit and add a `redirect_from:` entry pointing the old URL at the new one — Jekyll's `jekyll-redirect-from` plugin is already enabled, so old links keep working. Example:
  ```yaml
  permalink: /publication/2026-01-15-NewVenue
  redirect_from:
    - /publication/2026-01-15-NewVenu  # typo'd original
  ```
- If a file is being deleted (an old draft, an upstream sample page), make sure no internal links point at its permalink before removing it. Search for the permalink with grep across `_pages/`, `_includes/`, `_layouts/`, and `_data/`.

**Reference inventory of current public permalinks** (from `_pages/` and `_publications/`):

| Path | URL |
|---|---|
| `_pages/about.md` | `/` |
| `_pages/cv.md` | `/cv/` |
| `_pages/research.md` | `/research/` |
| `_pages/projects.md` | `/projects/` |
| `_pages/publications.md` | `/publications/` |
| `_pages/teaching.html` | `/teaching/` |
| `_pages/talks.html` | `/talks/` |
| `_pages/portfolio.html` | `/portfolio/` |
| `_pages/404.md` | `/404.html` |
| `_pages/category-archive.html` | `/categories/` |
| `_pages/tag-archive.html` | `/tags/` |
| `_pages/year-archive.html` | `/year-archive/` |
| `_pages/page-archive.html` | `/page-archive/` |
| `_pages/collection-archive.html` | `/collection-archive/` |
| `_publications/<YYYY-MM-DD-slug>.md` | `/publication/<YYYY-MM-DD-slug>` |

If you add a new publication via [[add-publication]], the new permalink follows the existing `/publication/YYYY-MM-DD-<slug>` convention — don't deviate from that pattern.
