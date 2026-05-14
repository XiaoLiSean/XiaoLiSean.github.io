# Workflow rules

Single-author personal site. The chosen workflow is "push direct, watch the deploy, iterate if it breaks." No PRs unless explicitly requested.

1. **Push direct to `master` for everything.** Use `/commit-direct` for any change — content, theme, infra, config. Master auto-deploys via the GH Actions workflow in `.github/workflows/jekyll.yml`. After each push, the workflow runs build then deploy; if build fails, the previous deploy stays live (no broken state in production), and the user fixes locally and pushes again.

2. **Watch the deploy after each push.** Run `gh api ...` or visit https://github.com/XiaoLiSean/XiaoLiSean.github.io/actions to see the latest run. Build typically completes in ~30–60s, deploy in another ~10–30s. If the user can't easily tell whether the deploy worked, fetch the live `https://xiaolisean.github.io/` and inspect the served HTML/CSS for the change.

3. **Don't edit upstream Minimal Mistakes / AcademicPages theme files unless making a deliberate theme change.** Content tweaks belong in `_pages/`, `_data/`, or the collection folders. Customizing theme files causes merge conflicts when pulling upstream theme updates.

4. **No local Jekyll preview.** Ruby/bundler is not installed on this machine. Visual verification happens on the live site after deploy. SCSS compile errors are surfaced by the GH Actions build job; Liquid template errors typically by the Pages deploy step. Read the run logs for diagnostics.

## PowerShell gotchas (hit multiple times this session)

5. **Don't use `ConvertFrom-Json` for OpenAlex / external API responses.** PowerShell 5.1's parser is case-insensitive and bails on JSON with case-only key collisions (e.g. OpenAlex sometimes returns both `to` and `To`). Use Python (`python -` from a heredoc) instead — Python is on PATH, has a case-sensitive JSON parser, and handles utf-8 cleanly when you set `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")`.

6. **HEREDOC commit messages parse-fail on `(`, `<`, `>`, `&`** (and other shell-meta inside `@'...'@`). Symptom: `git commit -m @'...'@` aborts mid-parse, branch ends up pushed without an actual commit. **Default to writing the message to a temp file and using `-F`:**
   ```powershell
   # Use the Write tool first to create .git/COMMIT_MSG_TMP
   git commit -F .git/COMMIT_MSG_TMP
   Remove-Item .git/COMMIT_MSG_TMP -Force
   ```
   This avoids every PowerShell shell-meta gotcha. Only fall back to HEREDOC when the message body is genuinely shell-safe.

7. **Don't pipe `git push` / `git fetch` through `2>&1`.** PowerShell 5.1 wraps native-exe stderr in error records, sets `$?` to false even when git exit code is 0, and breaks chained `if ($?) { ... }` patterns. Just let git write to stderr directly — the harness shows it as normal output. If you need to suppress the noise, use `2>$null` (drops it entirely) or filter the calling block, not the git invocation.

8. **Verify the commit included what you intended.** Always run `git status --short` AFTER `git commit` to confirm the working tree is clean. Twice this session, expected files were left uncommitted because of staging slips (the `_dark-theme.scss` `.logo-plate` rule, plus the original about.md edits). The 5-second post-commit check catches this.
