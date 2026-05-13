---
description: 'Commit and push directly to master, deploying to the live site immediately via the GH Actions workflow. Use ONLY for pure content edits (new file in _publications/, edit to _pages/publications.md, new PDF in files/, etc.) per .claude/rules/workflow.md. Refuses to run if any staged or modified file falls under the theme/infra paths (_sass/, _layouts/, _includes/, assets/, _config.yml, .github/) — those must go through /commit-pr instead.'
argument-hint: '[optional: short commit message; if omitted, will be derived from staged changes and confirmed]'
---

# Commit direct to master

Fast path for content edits. Push goes straight to master, the GH Actions workflow runs, and the live site deploys within a minute or two. **No PR, no compile check before deploy** — appropriate only for pure content where the build risk is near-zero.

## Step 1 — Sanity gates (refuse early if any fail)

1. **Branch must be `master`.** Run `git branch --show-current`. If not master, stop and tell the user: "You're on `<branch>`. This skill pushes directly to master. Either switch to master (`git checkout master`) and re-run, or use `/commit-pr` to commit on the current branch instead."

2. **Working tree must have something to commit.** `git status --porcelain` — if empty, stop with "Nothing to commit."

3. **No theme/infra files in the change set.** Run `git status --porcelain` and check each path. If ANY path matches one of these prefixes, **refuse**:
   - `_sass/`, `_layouts/`, `_includes/`, `assets/`, `_data/`
   - `_config.yml`, `Gemfile`, `Gemfile.lock`
   - `.github/`, `.claude/settings.json` (project hook config)
   - `_drafts/`

   If any match, stop with: "Found theme/infra changes: `<list>`. Per `.claude/rules/workflow.md`, master deploys live with no PR-build check, so theme/infra changes must go through `/commit-pr`. Either re-run with `/commit-pr`, or stash the theme files and re-run this skill on content alone."

   Allowed paths (content): `_pages/`, `_publications/`, `_portfolio/`, `_talks/`, `_teaching/`, `_posts/`, `images/`, `files/`, `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`, `.gitignore`, `README.md`.

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

## Step 3 — Stage explicitly

Stage files by name (or directory), NEVER `git add -A` or `git add .`. From the git status output, build an explicit `git add <paths...>` command listing only the changed files.

## Step 4 — Commit

Use a HEREDOC for the commit message in PowerShell (`@'...'@`) so quoting and line breaks are preserved.

## Step 5 — Push to master

Run `git push origin master`. Tell the user clearly: "**This triggers the GH Actions deploy job. Live site updates in 1–2 minutes.**"

## Step 6 — Report

Print:
- The commit SHA + title
- A link to the live site: https://xiaolisean.github.io
- A link to the Actions tab: https://github.com/XiaoLiSean/XiaoLiSean.github.io/actions

If the push fails (e.g. non-fast-forward because origin moved): tell the user, suggest `git pull --rebase origin master` and re-run.
