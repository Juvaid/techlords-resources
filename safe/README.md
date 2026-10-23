# SAFE: check dependencies before you install

From @techlordsbywlm ("Fake packages, real hack"). AI agents sometimes suggest npm packages that don't exist. Attackers watch for those names and publish malware under them ("slopsquatting"). The next developer who runs the same prompt installs it.

## Three habits

1. **New package? Look it up first.** Does it exist, how old is it, who publishes it, how many people use it? `check-deps.mjs` does this in one command.
2. **Commit your lockfile** (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`), and tell your agent never to add a dependency without asking (see [`../vibe/AGENTS.md`](../vibe/AGENTS.md)).
3. **Stop new packages in CI** until a human has looked at them.

## Run it locally

Node 18 or newer, no install needed:

```bash
node check-deps.mjs some-package another-package    # before you npm install them
node check-deps.mjs                                 # every dependency in package.json
```

`FAIL` means the package doesn't exist on npm. `WARN` means it is younger than 30 days, had fewer than 500 downloads last week, or links no source repository. Tune with `--min-age-days`, `--min-weekly` and `--strict` (warnings fail too).

## Add it to CI (GitHub Actions)

Copy `check-deps.mjs` to `scripts/` in your repo, then add `.github/workflows/check-deps.yml`:

```yaml
name: check new dependencies
on: pull_request
jobs:
  check-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/check-deps.mjs --since origin/${{ github.base_ref }} --strict
```

It checks only the dependencies the pull request adds, and fails the check if one doesn't exist or looks suspicious, so someone has to look before it merges.

## Also worth doing

- `npm audit` (or `npm audit signatures`) in CI for known vulnerabilities and registry signatures.
- Pin exact versions for anything critical, and review lockfile changes in every pull request.
