# Key leak checklist: the first 10 minutes

From @techlordsbywlm ("Key leak ho gayi? Pehle 10 minute"). Deleting the file, the message or the commit does not stop a leaked key. The key works until you revoke it. Do these in order, then fix the habit that leaked it.

Menus and limits differ by provider. Check your provider's own docs for the exact screen.

## Minute 0–1: revoke

- [ ] Open the provider's API keys page and **revoke or delete the leaked key now**. Do this before anything else, even before you know how it leaked.
- [ ] If you can't tell which key leaked, revoke every key the exposed file, screenshot or log contained.
- [ ] Rewriting git history or deleting the post comes later, if at all. GitHub's own guidance: revoke or rotate the secret first; once it is revoked it can no longer be used, and copies of old commits can survive in clones, forks and caches.

## Minute 1–4: replace it, and rotate everything it travelled with

- [ ] Create a new key with only the access the app needs, and put it **on the server only**: an environment variable or a secrets manager.
- [ ] Never ship a secret key in browser or mobile app code. Anything the browser downloads, anyone can read with View source. If the frontend needs to call an AI API, call your own server, and let the server hold the key.
- [ ] Rotate the other secrets that sat next to it: the rest of the `.env`, database passwords, webhook secrets, cloud credentials. If one leaked, assume the file leaked.
- [ ] If the key could reach other systems (a logging tool, a hosting account, a CI secret store), rotate the credentials stored there too. A leaked key is a chain, not one door.
- [ ] Redeploy, and check the app works with the new key.

## Minute 4–6: read the usage

- [ ] Open the usage or billing page. Note: when the unusual traffic started, how many requests, which models or services, which IPs if shown.
- [ ] Write down the time window. It tells you how long the key was exposed and which data or services the attacker could have touched.
- [ ] If customer data was reachable with that key, treat it as a possible data incident and follow your obligations to your customers.

## Minute 6–8: put a ceiling on the damage

- [ ] Set a **spend limit** if your provider has one, and an **alert** below it (for example at 50% and 80% of the monthly budget).
- [ ] Know the difference: an alert only tells you; a hard limit stops traffic. Example: Google Cloud says an alerts-only budget "doesn't automatically cap" spending. OpenAI describes spend alerts (notify) and hard spend limits (stop API traffic). Anthropic lets you set spend limits per workspace (not on the default workspace).
- [ ] One key per app and environment, so the next leak only hurts one thing.
- [ ] If the provider supports key expiry, set it, and plan a regular rotation.

## Minute 8–10: find the leak and close it

Check the usual places:

- [ ] Frontend code or a built JS bundle (search your deployed site's source for `key`, `sk-`, `secret`).
- [ ] A public or shared repository, including old commits and forks.
- [ ] Logs, error trackers and analytics events that print request headers.
- [ ] Screenshots, screen shares, Postman or API collections, chat messages, pasted prompts.
- [ ] Turn on secret scanning or push protection in your git host if it offers it, so the next one is caught before it ships.

## Before you go back to sleep

- [ ] The old key is revoked and the app runs on a new one.
- [ ] Every secret that travelled with it is rotated.
- [ ] I know when the misuse started and what it could reach.
- [ ] A limit and an alert are in place, and I know who gets the alert.
- [ ] The path the key leaked through is closed.

## Sources

- GitHub Docs, [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository): revoke or rotate first.
- OpenAI API reference, [Authentication](https://developers.openai.com/api/reference/overview): don't expose the key "in any client-side code such as browsers or apps"; load it on the server.
- OpenAI, [Production best practices](https://developers.openai.com/api/docs/guides/production-best-practices): key expiry and rotation, usage page, spend alerts and hard spend limits.
- Anthropic, [Rate limits and spend limits](https://platform.claude.com/docs/en/api/rate-limits): spend limits per workspace.
- Google Cloud, [Create, edit, or delete budgets and budget alerts](https://docs.cloud.google.com/billing/docs/how-to/budgets): alerts-only budgets do not cap spend.
- OWASP, [Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html): revoke potentially compromised secrets; audit when and by whom a secret was used.

## Important limits

This is a first-response list, not a full incident process. If the key could reach customer data, payment systems or production infrastructure, get help from someone who does incident response, and keep your notes on times and actions.
