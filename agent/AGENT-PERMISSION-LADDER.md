# Agent permission ladder

From @techlordsbywlm ("Agent ko kitni chaabi do?"). A coding agent can do whatever its token allows. It does not know which branch matters to you; the token and the repository rules decide. Give it the lowest rung that gets the job done, and enforce the rest outside the agent.

Wording below is GitHub's. Other git hosts have similar controls under different names.

## The ladder

| Rung | The agent may | Example task |
|---|---|---|
| 1. Read | Read code, issues and logs. Change nothing. | "Explain this bug", "review this PR" |
| 2. Write its own branch | Push commits to a branch it created (`agent/<task>`). | "Fix the failing test on a branch" |
| 3. Open a PR | Open a pull request from that branch, and update it after review. | "Send me a PR for the fix" |
| Human only | **Merge, deploy, delete** branches or tags, force push, change settings or secrets. | Never delegated |

Start every new agent or tool on rung 1. Move up one rung only when the task needs it.

## 1. The token: one repo, only the permissions it needs

- [ ] Never give an agent your own classic token or a token with access to all repositories.
- [ ] Use a **fine-grained personal access token** (or a GitHub App) with **Repository access → Only select repositories**, and pick the one repo.
- [ ] Repository permissions: **Contents** `read` for rung 1; `write` only for rung 2 and up. **Pull requests** `write` only for rung 3. Leave everything else at no access, especially administration, secrets and workflows.
- [ ] Set an **expiration**. Revoke the token when the task ends.
- [ ] Note: Contents `write` lets the agent push to and delete unprotected branches. That is why the rules below matter.

## 2. The rules: protect the branches that matter

Create a **ruleset** in the repository settings that targets `main`, `staging`, `release/*` and any branch a client or deploy depends on. Turn on:

- [ ] **Restrict deletions**: only people on the bypass list can delete matching branches.
- [ ] **Block force pushes**.
- [ ] **Require a pull request before merging**, with at least one approving review.
- [ ] **Require status checks to pass before merging**, using real tests, not only lint.
- [ ] Keep the **bypass list** short: named humans, never the agent's token or app.

Classic branch protection rules also block force pushes and deletions by default; check that "Allow force pushes" and "Allow deletions" stay off, and consider "Do not allow bypassing the above settings".

## 3. Deploys: one human says yes

- [ ] Put production deploys behind a GitHub Actions **environment** with **Required reviewers**. The job waits until one listed reviewer approves.
- [ ] Turn on **Prevent self-review** so the person (or bot) that triggered the run can't approve it.
- [ ] Untick **Allow administrators to bypass configured protection rules** if admins should wait too.
- [ ] Availability: on GitHub Free, environments work for public repositories only; private repositories need GitHub Pro or GitHub Team.

## 4. In the agent tool itself

- [ ] Commands that delete, force push, deploy or touch secrets need your approval in the tool.
- [ ] Your `AGENTS.md` / `CLAUDE.md` says which rung the agent is on and lists the "never" actions (see [`../vibe/AGENTS.md`](../vibe/AGENTS.md)).
- [ ] An instructions file is guidance. The token, the ruleset and the environment are the enforcement.

## Before you hand over the keys

- [ ] I know which rung this agent is on, and why.
- [ ] Its token reaches one repository, with the fewest permissions, and expires.
- [ ] Important branches can't be deleted or force-pushed, and need a reviewed PR.
- [ ] A human approves every merge to main and every production deploy.

## Sources

- GitHub Docs, [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- GitHub Docs, [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- GitHub Docs, [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- GitHub Docs, [Managing environments for deployment](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment)

## Important limits

Rules apply to everyone not on a bypass list, including you. Test a ruleset on a throwaway branch first. Branch rules do not protect a database, a cloud account or an email list; agents that can reach those need the same ladder there (see [`../guard/AGENT-SAFETY-CHECKLIST.md`](../guard/AGENT-SAFETY-CHECKLIST.md)).
