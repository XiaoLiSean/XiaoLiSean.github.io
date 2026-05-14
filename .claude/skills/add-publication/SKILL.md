---
description: 'Scaffold a new publication from a BibTeX entry. Creates the collection file in _publications/ and inserts the matching <li> block into _pages/publications.md, following the repo''s exact color/format conventions. Use when the user asks to "add a publication", "add a paper", or pastes a BibTeX entry.'
argument-hint: '<paste BibTeX entry after the command name>'
---

# Add publication

User invoked this skill to add a new publication. Their BibTeX entry is in `$ARGUMENTS`. If `$ARGUMENTS` is empty or doesn't look like BibTeX, ask them to paste the BibTeX entry now, then continue.

Follow `.claude/rules/publications.md` for color palette and format conventions. The two files you'll create/edit are the **only** places a new publication needs to appear.

## Step 1 — Parse the BibTeX

Extract:

- **Title** — `title` field, strip surrounding `{...}` braces.
- **Authors** — `author` field, split on ` and `. Reformat each as `First Last` (BibTeX often uses `Last, First`).
- **Year**, **Month** if present.
- **Category** — pick one:
  - `@article` with `journal=` → **Journal**
  - `@inproceedings`, `@conference` with `booktitle=` → **Conference**
  - `@misc` with `archivePrefix=arXiv` or `eprint=` → **Preprint**
  - Anything else → ask the user which of the three.
- **Paper URL** — in priority order: `url`, then `https://doi.org/<doi>`, then `https://arxiv.org/abs/<eprint>`.
- **Abstract** — `abstract` field if present.

Things the user must provide that BibTeX does **not** contain:

- **Venue homepage URL** for Conference / Journal entries (e.g. `https://cdc2024.ieeecss.org/`, `https://www.ieeecss.org/publication/transactions-control-systems-technology`). Ask for it.
- **Venue short label** for the `[VENUE YEAR]` tag (e.g. `CDC 2024`, `ACC 2024`, `L4DC 2024`, `TCST`, `ACA`). Confirm with the user.
- **Coauthor profile URLs** (Google Scholar / lab page) — see Step 1.5 below for the auto-reuse pattern; only ask the user for URLs that aren't already in the repo.

## Step 1.5 — Cross-check author list and reuse known coauthor URLs

Before scaffolding, do two checks the previous version of this skill missed:

**Author count cross-check.** If the BibTeX (or OpenAlex source) has an arXiv ID (or DOI), `WebFetch` the arXiv abstract page and compare the author list. OpenAlex and BibTeX both occasionally truncate authors. The TAC2025 entry was originally created with 3 authors when the actual paper has 5 — caught manually after the fact. If counts disagree, **ask the user** which list is correct.

**Reuse known coauthor URLs.** For each coauthor (other than Xiao), grep the repo for the bare name:
```
Grep tool: pattern "<First> <Last>", glob "_publications/**/*.md"
```
If a profile URL already exists for that name anywhere in `_publications/*.md` or `_pages/publications.md`, **reuse that exact URL** (matching `style="color:#7a8288;"` per [[publications]]). Don't re-prompt the user for URLs the repo already has.

The user has provided URLs for many regular collaborators in this session — capture them automatically when seen rather than asking each time:
- Anouck Girard → `https://vodca.engin.umich.edu/`
- Ilya Kolmanovsky → `https://sites.google.com/a/umich.edu/kolmanovsky/`
- John Talbot → `https://scholar.google.com/citations?user=t5KAs_YAAAAJ&hl=en` (note: "John Talbot", not "John M. Talbot")
- James Dallas → `https://scholar.google.com/citations?user=3GjYspgAAAAJ&hl=en`
- John Subosits → `https://scholar.google.com/citations?user=BmXLo58AAAAJ&hl=en`
- Gábor Orosz → `https://websites.umich.edu/~orosz/`
- Illés Vörös → `https://scholar.google.com/citations?user=ozjTXrYAAAAJ&hl=hu`
- H Eric Tseng → `https://scholar.google.com/citations?hl=en&user=UWnwlu4AAAAJ`
- Tianhao Wei → `https://scholar.google.com/citations?user=V22j1C0AAAAJ&hl=en`
- Changliu Liu → `https://icontrol.ri.cmu.edu/`
- Jiadi Zhang → `https://scholar.google.com/citations?user=fdXH8ZoAAAAJ&hl=en`

If a coauthor name doesn't match any of the above and no URL exists in the repo, render them plain (`<i>Name</i>`) and ask the user only at report time whether to add a URL.

## Step 2 — Determine date and slug

- **Date** (`YYYY-MM-DD`):
  - Conference / Journal: use publication month/year if known. If only year, use `YYYY-01-01` and confirm.
  - Preprint: use today's date.
- **Slug**: short uppercase venue acronym + year, matching existing files (`CDC2025`, `TAC2025`, `ACC2024`, `L4DC2024`, `TCST2024`, `ACA2023`, `ArXivSeanNet`). Confirm with the user before writing.
- **Filename**: `_publications/YYYY-MM-DD-<slug>.md`
- **Permalink**: `/publication/YYYY-MM-DD-<slug>` (no trailing slash, no `.md`)

## Step 3 — Build the authors HTML fragment

This same fragment is used in both files. Pattern:

- Xiao's own name: `<i><b>Xiao Li</b></i>` (italic + bold). Always include even if BibTeX abbreviates it as "X. Li".
- Coauthor with profile URL: `<a href="URL" target="_blank" style="color:#7a8288;"><i>Name</i></a>`
- Coauthor without URL: `<i>Name</i>`
- Separate authors with `,` and a space. End with two trailing spaces + newline to preserve markdown line-break behavior.

Example:

```
<i><b>Xiao Li</b></i>, 
<a href="https://vodca.engin.umich.edu/" target="_blank" style="color:#7a8288;"><i>Anouck Girard</i></a>, 
<a href="https://sites.google.com/a/umich.edu/kolmanovsky/" target="_blank"  style="color:#7a8288;"><i>Ilya Kolmanovsky</i></a>  
```

## Step 4 — Write the collection file

Path: `_publications/YYYY-MM-DD-<slug>.md`

Use this minimal template. **Do NOT** include the MathJax / `<style>` / supplementary `<table>` block by default — only add it if the user says the paper has video or table embeds (pattern: see `_publications/2025-12-24-TAC2025.md`).

````markdown
---
title: "{{TITLE}}"
collection: publications
permalink: /publication/{{YYYY-MM-DD-SLUG}}
---

{{AUTHORS_HTML}}

{{ABSTRACT_OR_BLANK_LINE}}

[<a href="{{PAPER_URL}}" target="_blank" style="color:#5DADE2;">{{LINK_LABEL}}</a>]
````

Pick `{{LINK_LABEL}}` to match existing convention:
- arXiv URL → `ArXiv`
- IEEE / Wiley / Elsevier / DOI → `Paper` or `paper` (lowercase is more common on the publications page; uppercase appears in some collection files — match the surrounding entries in the same category)

## Step 5 — Insert the `<li>` block into `_pages/publications.md`

Read `_pages/publications.md`. Locate the section header matching the determined category:
- Preprint → under `<hr /> <h2>Preprints</h2>`
- Conference → under `<hr /> <h2>Conferences</h2>`
- Journal → under `<hr /> <h2>Journals</h2>`

Insert the new `<li>` at the **top** of that section's `<ul>` (most recent first). Preserve the existing `<!-- ---- -->` separator comments between siblings.

### Preprint `<li>` template (no venue tag):

````html
  <!-- ---------------------------------------------------- -->
  <li>
    <b>{{TITLE}}</b><br/>
    {{AUTHORS_HTML}}
    <br/>
    [<a href="https://xiaolisean.github.io/publication/{{YYYY-MM-DD-SLUG}}" target="_blank" style="color:#5DADE2;">project page</a>
    <span>&#183;</span>
    <a href="{{PAPER_URL}}" target="_blank" style="color:#5DADE2;">arXiv</a>]
  </li>
````

### Conference / Journal `<li>` template (with venue tag):

````html
  <!-- ---------------------------------------------------- -->
  <li>
    [<a href="{{VENUE_URL}}" target="_blank" style="color:#494e52;">{{VENUE_SHORT}}</a>]
    <b>{{TITLE}}</b><br/>
    {{AUTHORS_HTML}}
    <br/>
    [<a href="https://xiaolisean.github.io/publication/{{YYYY-MM-DD-SLUG}}" target="_blank" style="color:#5DADE2;">project page</a>
    <span>&#183;</span>
    <a href="{{PAPER_URL}}" target="_blank" style="color:#5DADE2;">paper</a>]
  </li>
````

If the paper has an honor / award annotation, add it before the closing `<br/>` using `#750000`:

```html
<b><a href="HONOR_URL" target="_blank" style="color:#750000;">(Selected for Oral Presentation, 7.5%)</a></b>
```

Optional extra links (after the paper link, separated by `<span>&#183;</span>`):
- Code repo: `<a href="GITHUB_URL" target="_blank" style="color:#5DADE2;">code</a>`
- arXiv preprint of a published paper: `<a href="ARXIV_URL" target="_blank" style="color:#5DADE2;">full report</a>`

Ask the user if any of these apply.

## Step 6 — Report

Tell the user:

1. Which two files were created / modified, with paths.
2. The chosen category, date, and slug.
3. To **review the colors before committing** — they must match `.claude/rules/publications.md`.
4. If the paper has embedded video or tables, point them to `_publications/2025-12-24-TAC2025.md` as the pattern for adding MathJax + iframe blocks to the collection file.
5. To **adjust position within the `<ul>`** if they want a different ordering than top-of-section.

Do not run `bundle exec jekyll liveserve` or commit. The user decides when to verify and push.
