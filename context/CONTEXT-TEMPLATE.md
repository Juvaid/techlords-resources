# Context template

From @techlordsbywlm ("Duniya ka sabse perfect prompt"). Agents rarely fail on wording. They fail on missing context: they can't see which files matter, how your code does things, or what "done" looks like. Fill this in instead of polishing adjectives.

**The new-developer test:** could a capable developer who joined today do the task from this brief alone, without asking you anything? If not, the agent can't either.

## The template

Copy this into your agent chat (or save it as `tasks/<task-name>.md` and point the agent at it). Delete any section that truly doesn't apply.

```markdown
## Goal
<One or two sentences: what should be true when this is done, and for whom.>

## Files
- Read first: <path/to/file.ts> (<why it matters>)
- Change: <path/to/file.ts>, <path/to/other.ts>
- Don't touch: <paths that are out of scope>

## Pattern to follow
<Where this kind of thing already exists in the codebase, and what to copy from it.>
e.g. "Do it the way <src/routes/orders.ts> does: Zod schema at the top, handler below, errors through <handleError>."

## Working example
<A small piece of code, an input → output pair, or an existing endpoint that already works the way you want.>

## Constraints
- <Libraries to use / not to use>
- <No new dependencies without asking>
- <Performance, security or style rules that apply>

## Done when
- [ ] <Observable result 1, e.g. "POST /api/<thing> returns 201 with <shape>">
- [ ] <Observable result 2>
- [ ] <test command> passes, including a new test for <behaviour>

## Verify with
<The commands to run, the page to open, or the request to send.>
```

## The three that matter most

If you only have a minute, give these three:

1. **Which files.** Paths, not "the auth stuff".
2. **Which pattern.** "Like `<existing file>`", so the new code looks like the old code.
3. **One working example.** Something that already works the way you want. Agents copy examples far better than they follow descriptions.

## A filled example

```markdown
## Goal
Users can export their invoices as CSV from the Billing page.

## Files
- Read first: src/routes/invoices.ts (the existing JSON endpoint), src/lib/csv.ts (our CSV helper)
- Change: src/routes/invoices.ts, src/app/billing/page.tsx
- Don't touch: src/lib/payments/

## Pattern to follow
Same as the orders export in src/routes/orders.ts (`GET /orders/export`): auth check, query, `toCsv()`, `Content-Disposition` header.

## Working example
GET /orders/export → orders-2026-10.csv with columns id,date,amount,status

## Constraints
- Use src/lib/csv.ts; no new CSV package.
- Only the signed-in user's invoices.

## Done when
- [ ] GET /invoices/export returns a CSV with columns id,date,amount,status
- [ ] An "Export CSV" button on /billing downloads it
- [ ] npm test passes, with a new test for the export route

## Verify with
npm test; then open /billing and click Export CSV.
```

## Make it permanent

Context you repeat in every task (stack, commands, folder layout, "never" rules) belongs in a project memory file the agent reads automatically, like `AGENTS.md` or `CLAUDE.md`. Template: [`../vibe/AGENTS.md`](../vibe/AGENTS.md). Then each task brief only needs what's new.

And "please, kindly"? Keep it if you like. It isn't context.
