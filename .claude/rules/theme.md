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

5. **Verify visually after deploy.** Ruby/bundler isn't installed locally — push to master, watch the GH Actions deploy, then hard-refresh the live site (Ctrl+Shift+R) or test in incognito. Check the Publications page (most layout-sensitive) and narrow widths (masthead and author sidebar are responsive).

6. **Inline `<script>` tags MUST use only `/* */` block comments — never `//` line comments.** Jekyll's `compress_html` layout (configured in `_config.yml`) strips newlines inside `<script>` tags as well as HTML. Line comments then extend to the end of the (now non-existent) line and swallow everything after them, including `})()` IIFE invocations and any code that follows. Symptom: script appears in source but never runs; event listeners don't get attached; `getEventListeners(elem)` returns `{}`. Cost us a long debugging session — don't repeat. Same rule applies to `//` comments inside any inline JS in `_layouts/`, `_includes/`, or any markdown file that drops a `<script>` block.
