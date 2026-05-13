---
description: 'Commit on a feature branch and open a draft PR to master, so the GH Actions build runs before anything reaches the live site. Use for theme/infra changes (anything under _sass/, _layouts/, _includes/, assets/, _config.yml, .github/, .claude/settings.json) per .claude/rules/workflow.md, or any time you want a compile-check safety net before deploying.'
argument-hint: '[optional: branch name; if omitted, derived from the change summary]'
---

# Commit via PR

Slow path with a safety net. Commits go to a feature branch, the PR triggers the GH Actions build job (compile-check, no deploy), and you merge to master only after the check is green. Master never sees a broken commit.

## Step 1 — Verify there's something to commit

Run `git status --porcelain`. If empty, stop with "Nothing to commit."

## Step 2 — Pick or create the branch

Run `git branch --show-current`:

- **If on master**: create a new feature branch.
  - Branch name: use `$ARGUMENTS` if non-empty (it's a kebab-case name like `add-cdc-2026`). Otherwise propose a name derived from the change summary (e.g. `theme-color-tweak`, `add-add-publication-skill`, `cleanup-pages`) and confirm with the user.
  - Run `git checkout -b <branch>`.
- **If already on a non-master branch**: stay there. Tell the user "committing on existing branch `<branch>`."

## Step 3 — Show changes and craft commit message

Print `git status --short` so the user sees what's about to be committed.

For the commit message:
- Title: terse lowercase one-liner matching the existing log style (`git log --oneline -n 5`). Use `$ARGUMENTS` as a hint if it looks like a message rather than a branch name (long with spaces, vs short kebab-case). Otherwise derive from the change summary and confirm.
- Body (optional, recommended for multi-area changes): bulleted list of what changed by area.
- Always end with:
  ```
  Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
  ```

## Step 4 — Stage explicitly

Stage files by name or directory, NEVER `git add -A` or `git add .`. Build an explicit `git add <paths...>` from the git status output.

If `.claude/settings.local.json` shows up in untracked files, ensure `.gitignore` excludes it before staging anything else (it should already, from earlier setup; double-check).

## Step 5 — Commit

Use a HEREDOC for the message in PowerShell (`@'...'@`).

## Step 6 — Push the branch

Run `git push -u origin <branch>` (the `-u` sets upstream tracking for future pushes from this branch).

Capture git's output — the remote almost always prints a URL like:
```
remote: Create a pull request for 'X' on GitHub by visiting:
remote:   https://github.com/XiaoLiSean/XiaoLiSean.github.io/pull/new/X
```

## Step 7 — Report and hand off the PR-create URL

Print:
- The commit SHA + title
- The branch name + tip SHA
- The **PR-create URL** prominently:
  > **Open the PR:** https://github.com/XiaoLiSean/XiaoLiSean.github.io/pull/new/<branch>
- Instruction: "On the PR form, click the dropdown next to 'Create pull request' and pick **'Create draft pull request'** so it can't be merged until the build check is green and you mark it ready."

## Step 8 — What to expect on the PR

- The `.github/workflows/jekyll.yml` build job runs automatically (~30–60s) on PR open and on every subsequent push.
- The deploy job is skipped on PRs (gated `if: github.event_name == 'push' && github.ref == 'refs/heads/master'`).
- Green ✓ check = compilable; user marks PR ready and merges.
- Red ✗ check = user clicks into the Actions log to see the SCSS/Liquid error, fixes locally, commits on the same branch, pushes — a new check runs automatically.

## Step 9 — Optional follow-up

If the user later asks to merge the PR: instruct them to either click "Merge" on the PR page (after marking it ready), or use this sequence locally:
```powershell
git checkout master
git pull --ff-only origin master
git merge --ff-only <branch>
git push origin master
```
Pushing to master triggers the deploy job and the site goes live.

Do **not** auto-merge — the user should see the green check first.
