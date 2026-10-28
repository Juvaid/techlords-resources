# Tool setup: pick by the job

From @techlordsbywlm ("Cursor ya Claude Code? Dono."). The question isn't which tool wins. It's what the job looks like. Most AI coding tools now come in two shapes, and many people use one of each.

Features change fast. Check each tool's current docs before you rely on a specific setting.

## 1. Choose by the job

| The job | Shape that fits | Examples |
|---|---|---|
| Small edit you want to watch: a function, a component, a fix in one or two files | **Agent inside the editor**: you see the diff inline and accept or reject it | Cursor, other AI editors, editor extensions |
| Longer task: find code across many files, run tests and commands, iterate until green | **Agent in the terminal**: it runs commands, reads output and keeps going | Claude Code, other CLI agents |

Many tools now offer both shapes (Claude Code has editor extensions; some AI editors have a CLI). Pick the shape for the job, then the tool you like in that shape.

My setup: `<editor tool>` for small edits, `<terminal tool>` for long tasks.

## 2. One set of rules for every tool

Running the same project through two tools? Give them the same rules, or they will write code two different ways.

- [ ] Keep one source of truth: `AGENTS.md` at the repo root (template: [`../vibe/AGENTS.md`](../vibe/AGENTS.md)). Many agents read it automatically.
- [ ] **Claude Code** reads `CLAUDE.md`. Make it point at the shared file, for example a `CLAUDE.md` containing:
  ```markdown
  Read and follow @AGENTS.md.
  ```
- [ ] **Cursor** reads project rules (Settings → Rules, stored in the repo) and, in recent versions, `AGENTS.md`. Check that your version picks it up; if not, add a project rule that says "Follow AGENTS.md".
- [ ] `<other tool>` reads `<its rules file>`: point it at `AGENTS.md` the same way.
- [ ] Put the real commands in the rules file: run `<npm run dev>`, test `<npm test>`, typecheck `<npm run typecheck>`, lint `<npm run lint>`. Both agents then verify the same way.
- [ ] Commit the rules files, so the whole team (and every agent) gets them.

## 3. Same safety in both

- [ ] Each tool asks before running shell commands, or only auto-runs an allowlist (tests, typecheck, lint, build). Check each tool's permission settings; in Claude Code they live in `.claude/settings.json`.
- [ ] Destructive commands (`rm -rf`, `git push --force`, `git reset --hard`, deploys, database drops) are denied or always need approval.
- [ ] Neither tool can see production credentials. Full checklist: [`../guard/AGENT-SAFETY-CHECKLIST.md`](../guard/AGENT-SAFETY-CHECKLIST.md).

## 4. Don't race two agents on the same files

Pasting the same prompt into two tools and keeping whichever finishes first gets you two sets of changes to review, and often two sets of bugs.

- [ ] One task, one agent, one branch: `git switch -c agent/<task>`.
- [ ] Want two agents working at once? Give them different tasks on separate branches, each in its own working copy (`git worktree add ../<repo>-<task> -b agent/<task>`).
- [ ] Comparing tools on purpose? Same task, separate branches, then review both diffs before you merge one.

## 5. The cheat sheet

```text
Small edit, I want to watch   → agent in the editor
Long task, tests and commands → agent in the terminal
Both                          → same AGENTS.md, same commands, same "never" list
```
