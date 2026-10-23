# AGENTS.md

<!-- Template from @techlordsbywlm. Save this file as AGENTS.md at the root of your repo.
     Many coding agents read AGENTS.md automatically; for Claude Code, also save a copy as CLAUDE.md
     (or add a line to CLAUDE.md that says "Read AGENTS.md first"). Replace every <placeholder>. -->

## Project memory

- **What this is:** <one sentence: what the app does and for whom>
- **Stack:** <e.g. Next.js 15, TypeScript (strict), Zod, Postgres via Prisma, Tailwind>
- **Run it:** `<npm run dev>` · **Test it:** `<npm test>` · **Typecheck:** `<npm run typecheck>` · **Lint:** `<npm run lint>`
- **Where things live:**
  - `src/schemas/`: every data shape, as Zod schemas. Types come from these (`z.infer`), never hand-written.
  - `src/app/`: routes and pages.
  - `src/lib/`: shared logic. `src/components/`: UI.
  - `migrations/`: database migrations (see the rules below).

## How to work here

1. **Schema first.** Before writing logic for a new feature, add or update its Zod schema in `src/schemas/` and get the types from it. Validate every input at the boundary (API routes, forms, env).
2. **Small steps.** One change at a time. After each change, run the typecheck and the tests, and fix what you broke before moving on.
3. **Read before you write.** Open the files you are about to change and the ones that import them. Follow the patterns already in the code.
4. **Explain the diff.** When you finish, list the files you changed and why, and anything you could not verify.

## Never

- **Never** delete, rename or move files outside the task you were given.
- **Never** add a dependency without asking first. Name the package and why, and check that it exists on the registry.
- **Never** touch `.env*`, secrets, `migrations/` or CI config unless the task says so.
- **Never** run destructive commands (`rm -rf`, `git reset --hard`, `git push --force`, `DROP`, `DELETE` without `WHERE`) against anything but a local sandbox.
- **Never** connect to production. Use the local or staging database only.
- **Never** skip, delete or weaken a test to make it pass. Fix the code, or explain why the test is wrong.
- **Never** use `any`, `@ts-ignore` or `as unknown as` to silence the type checker.
- **Never** invent APIs, packages or config options. If you are not sure something exists, look it up or ask.
- **Never** rewrite a whole file when a small edit will do.

## When you are stuck

Stop and ask. A clear question beats a confident guess.
