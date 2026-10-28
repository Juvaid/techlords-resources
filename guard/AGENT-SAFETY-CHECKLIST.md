# Agent safety checklist

From @techlordsbywlm ("Bunty ne prod uda diya"). The agent is rarely the problem; the setup is. Go through this before an AI agent runs commands in your project.

## 1. Sandbox: the agent works away from production

- [ ] The agent runs against a **local or staging database**, never production. Its `.env` has no production URLs.
- [ ] Production credentials live in a secrets manager or CI secrets, **not** in files the agent can read (`.env`, `config/`, shell history).
- [ ] Seed data for the sandbox is fake or anonymised. Nothing the agent can delete is irreplaceable.
- [ ] For risky work, run the agent in a container or a separate machine/VM with only the repo mounted.
- [ ] Network access is limited to what the task needs (package registry, the staging API).

## 2. Permissions: only as much access as the job needs

- [ ] The agent uses a restricted database role. Do not use an object-owning or administrator role. Revoke `TRUNCATE` and `DELETE` privileges where the task does not require them, and prevent schema changes through the platform’s role controls. If row deletion is necessary, use reviewed row-level policies or constrained operations. A `WHERE` clause alone is not a permission boundary.
- [ ] Your agent tool asks before running shell commands, or only allows a short list of safe ones (tests, typecheck, lint, build).
- [ ] Commands like `rm -rf`, `git push --force`, `git reset --hard`, `curl … | sh` and deploys are blocked or need approval.
- [ ] The agent cannot push to `main` or deploy. It opens a branch or a pull request, and a human merges.
- [ ] API keys given to the agent are scoped (read-only where possible), have spending limits, and are easy to revoke.
- [ ] Your `AGENTS.md` / `CLAUDE.md` has a "Never" list (see [`../vibe/AGENTS.md`](../vibe/AGENTS.md)).

## 3. Checkpoints: code history and database recovery are separate

- [ ] Review `git status` and `git diff`, stage only the intended non-secret files, then commit a checkpoint before the task. Keep uncommitted work safe before switching branches.
- [ ] Ask the agent to work on a branch: `git switch -c agent/<task>`.
- [ ] Something broke? Inspect `git diff` first. For a committed change, prefer `git revert <commit-sha>` so the history is preserved. Save uncommitted work before any rollback. Git cannot restore a deleted database or reverse an external action.
- [ ] Databases: take a snapshot or backup before migrations, and test the restore at least once.
- [ ] Review the full diff before merging. If you can't explain a change, don't merge it.

## Before you say "AI ne bola tha chal jayega"

- [ ] I know exactly what the agent can touch.
- [ ] I have a recovery plan for code, databases and external actions, and I know which changes cannot be undone.
- [ ] A human approves anything that reaches production.

## Important limits

An instructions file is guidance, not an access-control system. Enforce permissions in the database, operating system, deployment platform and tool configuration. A checkpoint protects committed code; database recovery requires a tested backup or snapshot.
