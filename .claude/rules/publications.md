---
paths:
  - "_publications/**"
  - "_pages/publications.md"
---

# Publications rules

## The Publications page is hand-maintained, not auto-generated

`_pages/publications.md` does **not** iterate over the `_publications` collection — it is a hand-curated HTML list grouped into Preprints / Conferences / Journals, with custom link styling and coauthor hyperlinks. When adding a publication, edit **both**:

1. The collection file in `_publications/YYYY-MM-DD-<venue>.md` (this creates the project page at `/publication/...`).
2. The corresponding `<li>` block in `_pages/publications.md` (this is what visitors see on the Publications page).

Project pages in `_publications/` frequently embed MathJax (loaded inline in each file) and Google Drive video iframes — match this pattern for new entries.

## Style conventions to preserve

- **Coauthor name links** (external scholar / lab pages) use `style="color:#7a8288;"`.
- **Paper / code / arXiv / project-page links** use `style="color:#5DADE2;"`.
- **Venue tags** (e.g. `[CDC 2024]`) use `style="color:#494e52;"`.
- **Honors / award annotations** (e.g. "Selected for Oral Presentation") use `style="color:#750000;"`.
- **Xiao Li's own name** in collection files and on the publications page is wrapped as `<i><b>Xiao Li</b></i>` (italic + bold), not just bold.

Don't silently change this palette without doing a sweep of every entry — these colors are repeated across every `<li>` in `_pages/publications.md` and every project page in `_publications/`.
