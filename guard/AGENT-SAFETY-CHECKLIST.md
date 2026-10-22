# Agent safety checklist

From @techlordbywlm ("Bunty ne prod uda diya"). The agent is rarely the problem; the setup is. Go through this before an AI agent runs commands in your project.

## 1. Sandbox: the agent works away from production

- [ ] The agent runs against a **local or staging database**, never production. Its `.env` has no production URLs.
- [ ] Production credentials live in a secrets manager or CI secrets, **not** in files the agent can read (`.env`, `config/`, shell history).
- [ ] Seed data for the sandbox is fake or anonymised. Nothing the agent can delete is irreplaceable.
- [ ] For risky work, run the agent in a container or a separate machine/VM with only the repo mounted.
- [ ] Network access is limited to what the task needs (package registry, the staging API).

## 2. Permissions: only as much access as the job needs

- [ ] The agent's database user can **read and write**, but cannot `DROP`, `TRUNCATE` or `DELETE` without a `WHERE`. Destructive rights belong to a human-only role.
- [ ] Your agent tool asks before running shell commands, or only allows a short list of safe ones (tests, typecheck, lint, build).
- [ ] Commands like `rm -rf`, `git push --force`, `git reset --hard`, `curl … | sh` and deploys are blocked or need approval.
- [ ] The agent cannot push to `main` or deploy. It opens a branch or a pull request, and a human merges.
- [ ] API keys given to the agent are scoped (read-only where possible), have spending limits, and are easy to revoke.
- [ ] Your `AGENTS.md` / `CLAUDE.md` has a "Never" list (see [`../vibe/AGENTS.md`](../vibe/AGENTS.md)).

## 3. Checkpoints: every mistake is one command away from undone

- [ ] Commit (or stash) before every agent task: `git add -A && git commit -m "checkpoint: before <task>"`.
- [ ] Ask the agent to work on a branch: `git switch -c agent/<task>`.
- [ ] Something broke? See what changed with `git diff`, then roll back with `git reset --hard <checkpoint-sha>` (only on your own branch).
- [ ] Databases: take a snapshot or backup before migrations, and test the restore at least once.
- [ ] Review the full diff before merging. If you can't explain a change, don't merge it.

## Before you say "AI ne bola tha chal jayega"

- [ ] I know exactly what the agent can touch.
- [ ] I can undo anything it does in under a minute.
- [ ] A human approves anything that reaches production.
