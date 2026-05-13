---
description: 'Audit the site for permalink drift. Compares the current permalink set against the last committed state (HEAD) and against the reference inventory in .claude/rules/permalinks.md, and reports any URL that has been added, removed, or changed. Use when the user asks to "check permalinks", "audit permalinks", "verify URLs", or after any rename/delete in _pages/, _publications/, _portfolio/, _talks/, or _teaching/.'
argument-hint: ''
---

# Check permalinks

Verify no live URLs have drifted. Permalinks are an external contract (citations, scholar profiles, bookmarks) — see `.claude/rules/permalinks.md` for why.

## Step 1 — Collect current permalinks (working tree)

Grep `^permalink:` from every file under `_pages/`, `_publications/`, `_portfolio/`, `_talks/`, `_teaching/`, `_posts/`. For each match capture: source file, the permalink value (strip surrounding quotes if any).

Also extract the **collection-level permalink patterns** from `_config.yml`'s `collections:` block, and the **global permalink** at the top level of `_config.yml`.

## Step 2 — Collect committed permalinks (HEAD)

For each file found above, run `git show HEAD:<path>` and extract its `permalink:` (or note "new file — not in HEAD"). Likewise for `_config.yml`.

If a file exists in HEAD but not in the working tree (deleted), capture its old permalink too — that's a removed URL.

## Step 3 — Diff

Build three sets:

- **Removed**: a URL existed in HEAD's permalink set but is missing now (file deleted, or permalink field removed).
- **Changed**: a file's permalink value differs between HEAD and working tree.
- **Added**: a permalink exists now that wasn't in HEAD (new file, or permalink field added to existing file).

The first two are violations of the permalinks rule unless the user has explicitly chosen to break them. The third is fine — flag for awareness, not as an error.

## Step 4 — Cross-check against the reference inventory in [[permalinks]]

`.claude/rules/permalinks.md` contains a "Reference inventory of current public permalinks" table. Read it. For each row:

- If the URL no longer appears in the working-tree permalink set → drift; report.
- If the file path's current permalink differs from the table → drift; report.

For URLs in the working tree that aren't in the table → flag as "new permalink — consider adding to the inventory in `permalinks.md` if the page is intended to be long-lived."

## Step 5 — Report

Use this structure:

### ✗ Removed URLs
```
/old-publication-slug  (was in _publications/2023-01-01-OldVenue.md, now deleted)
  → if any external site links here, they will 404. Add a redirect_from on the replacement, or restore the file.
```

### ✗ Changed URLs
```
_publications/2024-12-16-CDC2024.md
  HEAD:        permalink: /publication/2024-12-16-CDC2024
  working:     permalink: /publication/CDC2024
  → bookmarks to the old URL will 404. Either revert, or add the old URL to redirect_from in the new front matter.
```

### + Added URLs
```
_publications/2026-05-12-NewPaper.md  →  /publication/2026-05-12-NewPaper
```
For each added URL, note: "if this matches the standard `/publication/YYYY-MM-DD-<slug>` pattern, add to the reference inventory in `.claude/rules/permalinks.md`."

### Inventory drift
```
permalinks.md says: _pages/sitemap.md → /sitemap/
  → file no longer exists in working tree; remove from inventory.
```

### Summary
```
N permalinks current
M removed since HEAD
K changed since HEAD
J added since HEAD
```

## Step 6 — Recommend the redirect_from fix when applicable

If any URL is removed or changed, end the report with:

> **To preserve old URLs:** the `jekyll-redirect-from` plugin is enabled. Add `redirect_from:` to the new/replacement front matter pointing at the old URL. Example:
> ```yaml
> permalink: /publication/2024-12-16-CDC2024-revised
> redirect_from:
>   - /publication/2024-12-16-CDC2024
> ```

Do **not** edit any files. The user decides per case whether to revert the change or add a redirect.
