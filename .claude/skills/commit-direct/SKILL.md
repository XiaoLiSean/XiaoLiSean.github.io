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

If the message body contains characters PowerShell parses as operators (parens, `&`, `|`, etc.), write the message to `.git/COMMIT_MSG_TMP` with the Write tool and use `git commit -F .git/COMMIT_MSG_TMP` instead of HEREDOC. Then `Remove-Item .git/COMMIT_MSG_TMP -Force` after commit.

## Step 3 — Stage explicitly

Stage files by name (or directory), NEVER `git add -A` or `git add .`. From the git status output, build an explicit `git add <paths...>` command listing only the changed files.

## Step 4 — Commit

Use a HEREDOC (`@'...'@`) for the commit message in PowerShell, OR `git commit -F .git/COMMIT_MSG_TMP` if the message has shell-troublesome characters.

## Step 5 — Push to master

Run `git push origin master`. Tell the user clearly: "**This triggers the GH Actions deploy job. Live site updates in 1–2 minutes.**"

## Step 6 — Report

Print:
- The commit SHA + title
- A link to the Actions tab: https://github.com/XiaoLiSean/XiaoLiSean.github.io/actions
- A link to the live site: https://xiaolisean.github.io

If the push fails (e.g. non-fast-forward because origin moved): tell the user, suggest `git pull --rebase origin master` and re-run.

If the GH Actions build fails after push: read the run log (`gh api ...` or fetch the Actions page), identify the SCSS/Liquid error, fix locally, and re-run this skill.
