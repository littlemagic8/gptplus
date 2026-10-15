# Repository Git Workflow

## Required workflow

- Never commit or push changes directly to `main`.
- Start every implementation task from a new feature branch. Use the `codex/` prefix unless the user specifies another branch name.
- Commit and push the feature branch to the remote repository.
- Create a Merge Request / Pull Request targeting `main`, and wait for it to be merged before considering the change part of `main`.
- Direct pushes to `main` are prohibited, including small fixes, documentation updates, and configuration changes.

## Exception

Only the user may explicitly override this policy for a specific, one-time direct push. That override does not change this repository-wide default.
