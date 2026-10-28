# AI cost checklist

From @techlordsbywlm ("AI bill kisne kiya?"). Most surprise AI bills come from three habits: the biggest model on every task, the same long context paid for again and again, and keys with no limit. Flip three switches, then measure.

Prices, discounts and limits change often and differ by provider. Check your provider's pricing page before you plan around a number.

## 1. Right-size the model: small job, small model

- [ ] List every place your app calls a model, and what each call does: `<feature>` → `<model>` → `<calls per day>`.
- [ ] Sort the tasks: **simple** (classify, extract, rename, spell-check, short summaries) vs **hard** (multi-step reasoning, long code changes, tricky writing).
- [ ] Try the simple tasks on a smaller, cheaper model. Run 20–50 real examples through both and compare. If you can't tell the outputs apart, switch.
- [ ] Keep the big model for the hard tasks (the Ferrari stays for race day).
- [ ] Put the model name in config, not scattered through the code, so you can change it per feature: `<MODEL_SIMPLE>`, `<MODEL_HARD>`.
- [ ] Cap the output: set a max output tokens value that fits the task. Ask for short answers when short answers will do.

## 2. Cache what you send again and again

- [ ] Turn on **prompt caching** if your provider offers it. Cached input is usually billed at a discount, not for free; check the rate, the minimum prompt length and how long the cache lasts.
- [ ] Order every prompt **static first, changing last**: system prompt, tool definitions, docs and examples at the top; the user's message and fresh data at the bottom. Caches match the start of the prompt, so one changed word near the top breaks the match.
- [ ] Don't put timestamps, request IDs or random ordering in the static part.
- [ ] Cache whole answers in your own app when the same question comes in again (`<cache key>` = model + prompt hash), with an expiry: `<TTL>`.
- [ ] Trim the context. Send the files and records the task needs, not the whole repo or the whole chat history.
- [ ] Work that can wait (nightly reports, bulk tagging)? Check whether your provider has a batch API; some price it lower.

## 3. Cap every key: the bill is a plan, not a surprise

- [ ] One key per app and environment (`<app>-dev`, `<app>-prod`), never one shared key for everything. Name each key after its owner and purpose.
- [ ] Set a **spending limit** and an **alert** at whatever level your provider supports (per key, per project or per workspace). If it supports none, route calls through a gateway or proxy that enforces one.
  - Monthly limit: `<amount>` · alert at `<50%>` and `<80%>` · alert goes to `<email / Slack channel>`.
- [ ] Add your own guard in code: a per-user or per-feature limit on requests per day, so one loop or one abusive user can't burn the budget.
- [ ] Agents and scripts get their own key with a low limit. A runaway agent loop should hit a wall, not your card.
- [ ] Keys live in a secrets manager or environment variables, never in the repo. Revoke and rotate any key that leaks.

## 4. Measure every week

Every API response reports token usage (input, output and, where supported, cached tokens). Log it.

- [ ] Log per call: `feature`, `model`, `input_tokens`, `cached_input_tokens`, `output_tokens`, `user_id`, `timestamp`.
- [ ] Once a week, look at cost per feature and per user. The top 3 lines are where to work.

| Feature | Model | Calls / day | Avg input tokens | Avg output tokens | Cost / day |
|---|---|---|---|---|---|
| `<feature>` | `<model>` | `<n>` | `<n>` | `<n>` | `<amount>` |
| `<feature>` | `<model>` | `<n>` | `<n>` | `<n>` | `<amount>` |

## Before next month's bill

- [ ] Every task runs on the smallest model that does it well.
- [ ] Repeated context is cached, and prompts are ordered static first.
- [ ] Every key has a limit and an alert, and I know who gets the alert.
- [ ] I can say which feature costs the most, and why.
