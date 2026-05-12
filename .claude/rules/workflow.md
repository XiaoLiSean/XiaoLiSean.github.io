# Workflow rules

The site is currently undergoing a **full theme overhaul** (large changes to `_sass/`, `_layouts/`, `_includes/`, possibly replacing Minimal Mistakes partials with custom code). After the overhaul stabilizes, work shifts to ongoing content maintenance. These rules apply to every session.

1. **Branch for theme work; push direct only for content.** `master` auto-deploys via GitHub Pages, so a broken SCSS or layout commit on `master` = broken live site. For any change touching `_sass/`, `_layouts/`, `_includes/`, `assets/`, or `_config.yml`, work on a feature branch and merge via PR after verifying locally. Pure content edits (new file in `_publications/`, edit to `_pages/publications.md`, new PDF in `files/`) are safe to push direct.

2. **Always verify visually in `bundle exec jekyll liveserve` before declaring a style/layout task done.** SCSS compile errors and Liquid template errors are silent at edit time — only the build surfaces them, and even a clean build can produce a broken visual result. Open `http://localhost:4000` and check the actually-changed pages (the Publications page is the most layout-sensitive). Test at narrow widths too — the masthead and author sidebar are responsive.

3. **Don't edit upstream Minimal Mistakes / AcademicPages theme files unless making a deliberate theme change.** Content tweaks belong in `_pages/`, `_data/`, or the collection folders. Customizing theme files causes merge conflicts when pulling upstream theme updates.
