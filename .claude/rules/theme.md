---
paths:
  - "_sass/**"
  - "_layouts/**"
  - "_includes/**"
  - "assets/**"
  - "_config.yml"
---

# Theme / style rules

These apply to the in-progress full theme overhaul of the Minimal Mistakes / AcademicPages base.

1. **Prefer net-new custom files over editing upstream Minimal Mistakes partials.** Put new SCSS in a `_sass/custom/` (or similarly-named) folder and import it from the main stylesheet; put new layouts/includes alongside the upstream ones with distinct names. This keeps the overridden surface small if you ever pull upstream theme bug fixes, and makes a future theme migration tractable.

2. **Don't silently change the existing link / coauthor color palette** (`#7a8288`, `#5DADE2`, `#494e52`, `#750000`). These colors are repeated across every `<li>` in `_pages/publications.md` and every project page in `_publications/`. If the overhaul does change them, do a sweep so the whole site is consistent.

3. **Use the `Plan` subagent before large SCSS / layout refactors**, and the `Explore` subagent for "where is X used" lookups across the theme. This codebase has long cascades through `_sass/*.scss` partials and `_includes/*.html` Liquid templates — full file reads waste context fast.

4. **Run the `simplify` skill after a refactor pass** to flag dead SCSS, duplicated rules, or partials left orphaned by the overhaul.

5. **Verify in a browser via `bundle exec jekyll liveserve` before merging.** SCSS compile errors are silent at edit time and a clean build can still produce a broken visual result. Check the Publications page (most layout-sensitive) and test narrow widths (the masthead and author sidebar are responsive).
