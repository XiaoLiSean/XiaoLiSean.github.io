---
description: 'Commit and push directly to master, deploying to the live site via the GH Actions workflow. Use for any change — content, theme, infra, config — per .claude/rules/workflow.md (single-author personal site, push-and-iterate workflow). The GH Actions build job will catch SCSS/Liquid errors before the deploy job replaces the live site, so worst case the previous deploy stays live.'
argument-hint: '[optional: short commit message; if omitted, will be derived from staged changes and confirmed]'
---

# Commit direct to master

Push goes straight to master, the GH Actions workflow runs, and the live site deploys within a minute or two. If the build fails, the previous deploy stays live (no broken state in production); fix locally, push again.

## Step 1 — Sanity gates

1. **Branch must be `master`.** Run `git branch --show-current`. If not master, ask the user whether to switch (`git checkout master`) or commit on the current branch instead.

2. **Working tree must have something to commit.** `git status --porcelain` — if empty, stop with "Nothing to commit."

3. **Don't accidentally commit secrets.** Scan staged paths for: `.env`, `*.key`, `*.pem`, `credentials.json`, `*token*`, `Gemfile.lock` containing secrets, etc. If any look risky, stop and confirm.

## Step 2 — Show changes and craft message

Print `git status --short` so the user sees what's about to be committed.

For the commit message:
- If `$ARGUMENTS` is non-empty, use it as the title (one short lowercase line, matching the existing commit log style — see `git log --oneline -n 5`).
- Otherwise, derive a terse title from the change summary (e.g. "add CDC 2026 publication", "update teaching", "fix typo in research"). Confirm the proposed title with the user before committing.

For multi-file changes, optionally add a short body listing what changed; otherwise the title alone is fine — the existing log shows mostly title-only commits.

Always end the message with the trailer:
```
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

**Default to the file-based message path**, not HEREDOC. PowerShell HEREDOCs (`@'...'@`) parse-fail on parens, angle brackets, ampersands, pipes — and these appear constantly in real commit messages (`(prefers-color-scheme: dark)`, `<date>`, `&lt;`, etc.). Symptom of failure: parser error mid-message, branch ends up pushed without an actual commit. Hit twice this session.

The reliable pattern:
1. Use the Write tool to create `.git/COMMIT_MSG_TMP` containing the full commit message (title + body + trailer).
2. `git commit -F .git/COMMIT_MSG_TMP`
3. `Remove-Item .git/COMMIT_MSG_TMP -Force`

Only fall back to `-m "..."` when the message is a single short shell-safe line.

## Step 3 — Stage explicitly

Stage files by name (or directory), NEVER `git add -A` or `git add .`. From the git status output, build an explicit `git add <paths...>` command listing only the changed files.

## Step 4 — Commit

Use the file-based path from Step 2 (`git commit -F .git/COMMIT_MSG_TMP`).

## Step 5 — Verify the commit captured what you intended

Always run `git status --short` AFTER the commit succeeds. Working tree should be clean (no `M` / `?? ` lines for files you meant to include). If anything you intended to commit is still showing, you missed staging it — `git add` and recommit BEFORE pushing.

This catches a real recurring bug: twice this session, a related file was edited but never staged, and we declared "done" only to discover the change wasn't deployed (`_dark-theme.scss` `.logo-plate` rule, the original about.md edits). The 5-second post-commit check eliminates this class of error.

## Step 6 — Push to master

Run `git push origin master`. **Don't pipe through `2>&1`** — PowerShell 5.1 wraps git's stderr in error records, sets `$?` to false even when git exit code is 0, and breaks `if ($?) { ... }` chains. Just let git write to stderr directly.

Tell the user clearly: "**This triggers the GH Actions deploy job. Live site updates in 1–2 minutes.**"

## Step 7 — Report

Print:
- The commit SHA + title
- A link to the Actions tab: https://github.com/XiaoLiSean/XiaoLiSean.github.io/actions
- A link to the live site: https://xiaolisean.github.io

If the push fails (e.g. non-fast-forward because origin moved): tell the user, suggest `git pull --rebase origin master` and re-run.

If the GH Actions build fails after push: read the run log (`gh api ...` or fetch the Actions page), identify the SCSS/Liquid error, fix locally, and re-run this skill.
