---
description: 'Sync the local _publications/ collection and the hand-curated _pages/publications.md against the authors public publication record. Detects new papers, title changes, venue transitions (preprint -> conference -> journal), DOI/arXiv additions, and coauthor changes. Prints a structured diff and applies changes only after explicit user approval per item. Uses OpenAlex as the data source (free, JSON, no key) because Google Scholar has no public API and blocks scraping. Use when the user asks to "check for new publications", "sync publications", "update from scholar", or "import new papers".'
argument-hint: ''
---

# Sync publications from OpenAlex

## Why OpenAlex, not Google Scholar

Google Scholar has no official API and aggressively blocks scraping (CAPTCHAs, IP-based throttling). Any scraper-based tool is fragile. **OpenAlex** is a free, comprehensive academic graph that aggregates from CrossRef, PubMed, arXiv, MAG, and other sources — coverage closely tracks Scholar for published works, including arXiv preprints. Gaps to expect: (a) very recent (last few days) arXiv uploads not yet indexed, (b) workshop papers without DOIs, (c) some non-CS conference proceedings. Flag those manually.

## Step 1 - Resolve the author

Read `_config.yml`. Extract `author.orcid` and strip the `https://orcid.org/` prefix. If absent, ask the user for an ORCID or an OpenAlex author ID (`A...`).

Query the author endpoint with a polite User-Agent header (OpenAlex requests it for free tier):

```powershell
$orcid = "0000-0002-1032-5533"  /* read from _config.yml */
$ua = "XiaoLiSean.github.io publication sync (mailto: hsiaoli@umich.edu)"
$author = Invoke-RestMethod -Uri "https://api.openalex.org/authors/orcid:$orcid" -Headers @{ 'User-Agent' = $ua }
$shortId = $author.id -replace 'https://openalex.org/', ''
"Resolved author: $($author.display_name) ($shortId)"
"Works count according to OpenAlex: $($author.works_count)"
```

If the lookup 404s, ask the user to confirm the ORCID or paste the OpenAlex author ID directly.

## Step 2 - Fetch works

```powershell
$worksUrl = "https://api.openalex.org/works?filter=author.id:$shortId&per-page=200&sort=publication_year:desc"
$resp = Invoke-RestMethod -Uri $worksUrl -Headers @{ 'User-Agent' = $ua }
$works = $resp.results
if ($resp.meta.count -gt 200) { /* paginate with &page=2, &page=3... */ }
```

For each work, extract:

- `title`
- `publication_year`, `publication_date`
- `doi` (full URL or null)
- `id` (OpenAlex work ID; the URL also encodes arxiv id when applicable)
- `authorships[].author.display_name` (ordered list)
- `primary_location.source.display_name` (venue name)
- `primary_location.source.type` (`journal`, `conference`, `repository`, `book series`, etc.)
- `type` (`article`, `preprint`, `book-chapter`, etc.)
- `ids.doi`, `ids.openalex`, and any arXiv ID buried in `locations[].landing_page_url`

Map OpenAlex venue type to the user's three sections:

| OpenAlex | Maps to |
|---|---|
| `source.display_name == "arXiv"` OR `type == "preprint"` OR `source.type == "repository"` | Preprints |
| `source.type == "conference"` OR title/venue indicates proceedings | Conferences |
| `source.type == "journal"` | Journals |
| anything else | ask the user |

## Step 3 - Read local publications

For each file in `_publications/*.md`:

- Read YAML frontmatter: `title`, `permalink`.
- Scan body for the first external paper link in the format `[<a href="URL" ...>label</a>]`.
- Classify the URL:
  - `arxiv.org/abs/<id>` -> arXiv ID
  - `doi.org/<doi>` -> DOI
  - `ieeexplore.ieee.org/document/<n>` or `ieeexplore.ieee.org/abstract/document/<n>` -> IEEE doc ID (resolve to DOI via the API or treat as opaque)
  - `proceedings.mlr.press/...`, `onlinelibrary.wiley.com/doi/...`, `sciencedirect.com/...`, `sae.org/...` -> extract DOI when present in the URL
- Note the file's date (from filename `YYYY-MM-DD-<slug>.md`) and slug.

Also read `_pages/publications.md` and parse the `<li>` blocks under each `<h2>` section (Preprints / Conferences / Journals) so we know which section each entry currently lives in.

## Step 4 - Match each OpenAlex work to a local entry

In priority order:

1. **DOI match** (most reliable).
2. **arXiv ID match**.
3. **Title fuzzy match** - normalize (lowercase, strip punctuation, collapse whitespace), compare with a similarity ratio. Match if >= 0.85.
4. **Year + first-author + partial title** as a last resort.

For each match, compute field-by-field differences:
- Title (case-sensitive comparison after stripping smart quotes)
- Author list (full ordered comparison; flag adds, removes, reorderings)
- Venue (preprint vs conference vs journal -> section change implication)
- DOI added/changed
- Year corrected

Bucket the results:
- `NEW`: in OpenAlex, not matched to any local entry.
- `CHANGED`: matched, but at least one field differs.
- `UNCHANGED`: matched, no diffs (don't include in report unless user asks).
- `LOCAL_ONLY`: in repo, no matching OpenAlex work (often arXiv-only or recent; never propose deletion).

## Step 5 - Print the diff report

Use this exact structure for clarity. Color/markup is optional but the structure is not:

```
=== SCHOLAR SYNC REPORT ===
Author: Xiao Li (ORCID 0000-0002-1032-5533, OpenAlex A5012345678)
Local _publications/: N files
OpenAlex works: M
Matched: K  |  New: X  |  Changed: Y  |  Local-only: Z

[NEW] entries from OpenAlex not yet in the repo:

  N1.  "Title of the paper" (2026)
       Venue: IEEE Transactions on Automatic Control [Journal]
       Authors: Xiao Li, A. Girard, I. Kolmanovsky
       DOI: 10.1109/TAC.2026.xxxxx
       Suggested file: _publications/2026-MM-DD-TAC2026.md
       Suggested section in publications.md: Journals
       Action: would invoke add-publication with synthesized BibTeX

  N2.  ...

[CHANGED] existing entries with field diffs:

  C1.  _publications/2025-12-24-TAC2025.md
       - title:
           OLD: "Control Invariant Sets for Neural Network Dynamical Systems and Recursive Feasibility in Model Predictive Control"
           NEW: "Control Invariant Sets for Neural Network Dynamical Systems and Recursive Feasibility in MPC"
       - venue:
           OLD: arXiv preprint
           NEW: IEEE Transactions on Automatic Control (Journal)
           => SECTION MOVE in _pages/publications.md: Preprints -> Journals
       - DOI:
           OLD: (none, arXiv-only)
           NEW: 10.1109/TAC.2026.xxxxx
       Action: edit collection file + move <li> in publications.md to Journals section + update link from arXiv to paper DOI

[LOCAL_ONLY] in repo, not in OpenAlex (no action proposed):

  L1.  _publications/2021-10-05-ArXivSeanNet.md
       "Seannet: Semantic Understanding Network for Localization under Object Dynamics"
       Likely arXiv-only and not indexed by OpenAlex. Verify on Google Scholar manually if you want.
```

## Step 6 - Ask which to apply

Print the prompt:

> "Reply with the numbers to apply (e.g. `N1, C1`), `all`, or `none`."

Wait for the user's response. Do NOT auto-apply.

## Step 7 - Apply approved changes

For each approved `N` (new):
- Synthesize a minimal BibTeX entry from the OpenAlex metadata (title, authors, year, venue, doi).
- Confirm the file slug with the user (`YYYY-MM-DD-<slug>.md`). Default: short uppercase venue acronym + year if obvious; otherwise ask.
- Write `_publications/YYYY-MM-DD-<slug>.md` with the standard collection-file template (see [[publications]]).
- Insert the `<li>` block at the **top** of the appropriate section in `_pages/publications.md`, with the exact color palette per [[publications]].
- Author HTML: wrap "Xiao Li" as `<i><b>Xiao Li</b></i>`; coauthors get plain `<i>Name</i>` unless the user provides scholar/lab URLs.

For each approved `C` (changed):
- Edit the `_publications/YYYY-MM-DD-<slug>.md` file's relevant fields.
  - **Never modify the `permalink:` field** per [[permalinks]]. If the permalink would conceptually need to change (e.g. slug rename), refuse and ask the user to handle manually with `redirect_from:`.
- If venue changed in a way that requires a section move:
  - Remove the `<li>` from the old `<ul>` in `_pages/publications.md`.
  - Insert at the **top** of the new section's `<ul>`.
  - Update the `<li>` content with the new venue tag, paper link, and any other changed fields.

## Step 8 - Final report

Print:
- List of files created (`A`) and modified (`M`).
- Suggest running [[check-permalinks]] and [[check-links]] to verify nothing was inadvertently broken.
- Suggest `/commit-direct "sync publications from openalex"` when ready to deploy.

Do not commit automatically.

## Caveats to surface in the report

- OpenAlex sometimes lists author names with initials only (e.g. "X. Li"); the matcher should treat these as equivalent to full names when surnames + first initial agree.
- A paper may be in OpenAlex under multiple records (preprint + published version with different DOIs) - prefer the published version. Flag duplicates if both appear.
- The `publication_date` from OpenAlex may differ from the user's existing filename date (which often reflects when they ADDED the entry, not the actual publication date). Don't propose filename renames - those would change the URL per [[permalinks]].
