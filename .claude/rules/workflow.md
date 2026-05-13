# Workflow rules

Single-author personal site. The chosen workflow is "push direct, watch the deploy, iterate if it breaks." No PRs unless explicitly requested.

1. **Push direct to `master` for everything.** Use `/commit-direct` for any change — content, theme, infra, config. Master auto-deploys via the GH Actions workflow in `.github/workflows/jekyll.yml`. After each push, the workflow runs build then deploy; if build fails, the previous deploy stays live (no broken state in production), and the user fixes locally and pushes again.

2. **Watch the deploy after each push.** Run `gh api ...` or visit https://github.com/XiaoLiSean/XiaoLiSean.github.io/actions to see the latest run. Build typically completes in ~30–60s, deploy in another ~10–30s. If the user can't easily tell whether the deploy worked, fetch the live `https://xiaolisean.github.io/` and inspect the served HTML/CSS for the change.

3. **Don't edit upstream Minimal Mistakes / AcademicPages theme files unless making a deliberate theme change.** Content tweaks belong in `_pages/`, `_data/`, or the collection folders. Customizing theme files causes merge conflicts when pulling upstream theme updates.

4. **No local Jekyll preview.** Ruby/bundler is not installed on this machine. Visual verification happens on the live site after deploy. SCSS compile errors are surfaced by the GH Actions build job; Liquid template errors typically by the Pages deploy step. Read the run logs for diagnostics.
