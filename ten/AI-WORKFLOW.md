# The AI workflow (TEN)

From @techlordsbywlm ("10x developer? Aur das bugs."). Speed with an AI agent doesn't come from bigger prompts. It comes from three habits: **small diffs, tests first, read every change.** Here is the loop, with prompts you can copy.

## The loop (one task at a time)

1. **Checkpoint.** Start clean, so any mistake is one command from undone.
   ```bash
   git status                          # nothing uncommitted
   git switch -c agent/<short-task-name>
   ```
2. **Plan, don't build.** Ask for a plan before any code (prompt A below). Cut it into steps small enough to review in a few minutes each.
3. **One step.** Give the agent one step, not the whole feature (prompt B).
4. **Test first.** The step starts with a test that fails for the right reason, then the code that makes it pass (prompt C).
5. **Run the checks yourself.** `<npm test>` · `<npm run typecheck>` · `<npm run lint>`. Green, then go on. Red, fix it before anything else.
6. **Read the diff.** `git diff`. Every line. If you can't explain a change, it doesn't get merged (checklist below).
7. **Commit**, then go back to step 3 for the next step.
   ```bash
   git add -A && git commit -m "<what this step did>"
   ```

## Habit 1: small diffs

A diff you can read in two minutes is a diff you will actually read. A 2,000-line diff gets skimmed, and skimmed code is where the bugs hide.

- One task per prompt. "Add the `<field>` to the `<form>`", not "build the settings page".
- Name the files it may touch. Anything else is out of scope.
- If the agent wants to refactor something along the way, that is a separate task, later.

## Habit 2: tests first

The test is the agent's finish line. Without one, "done" means "it compiled".

- Write (or ask for) the test before the code, and check that it fails before the fix.
- Never let the agent delete, skip or weaken a test to get to green. Fix the code, or explain why the test is wrong.
- Bug report? First a test that reproduces it, then the fix.

## Habit 3: read every change

- [ ] I know why each file in the diff changed.
- [ ] No files changed outside the task.
- [ ] No new dependency I didn't ask for (and if there is one, it exists and I checked it).
- [ ] No secrets, `.env` values or debug logs in the diff.
- [ ] No disabled checks: `any`, `@ts-ignore`, `eslint-disable`, skipped tests, empty `catch`.
- [ ] Error cases handled, not just the happy path.
- [ ] Anything I don't understand, I asked the agent to explain, or I removed it.

## Prompts to copy

**A. Plan**
```text
Task: <what you want, in one or two sentences>.
Before writing any code, read <files> and give me a numbered plan of small steps.
Each step should change at most <2-3> files and come with a test. List any questions first.
```

**B. One step**
```text
Do step <n> of the plan only: <step>.
Touch only <files>. Follow the pattern in <example file>.
Stop when it's done and list the files you changed and why.
```

**C. Test first**
```text
For step <n>, first write a test in <test file> that fails because <behaviour> is missing.
Run it and show me it fails. Then write the smallest change that makes it pass, and run <test command> again.
Do not modify existing tests.
```

**D. Explain the diff**
```text
Walk me through your diff file by file: what changed, why, and what could break.
Say what you ran to verify it and what you could not verify.
```

## The 10x that counts

Count merged changes that didn't come back as bug reports, not features per day.
