# Production gate — Tech Lords hub

VERDICT: PASS (pre-deployment gate)

- Goal: branded Tech Lords-only resource hub on techlord.wordlordmedia.com, matching the existing public GitHub resources and the observed two reels / five carousels.
- Repository: Juvaid/techlords-resources, branch codex/techlords-resource-hub. Source scope: site/, README, the GUARD checklist and the audit/operations docs.
- Out of scope: WordLord main/admin applications, Convex, payments, existing WordLord DNS records, Instagram profile changes, messages and DM automation.
- Correctness: `node site/build.mjs` and `node site/check.mjs` passed (four pages, 41 local asset/link targets, three identical downloads, 19 checklist items). `git diff --check` passed. Known secret-prefix scan found no embedded credentials. Cloudflare Wrangler 4.152 dry-run passed.
- Product: desktop and 390px mobile layout inspected. GUARD tick state persisted between visits; reset, copy link and copy Markdown produced their expected UI statuses. VIBE lists both real files with direct downloads and GitHub source links. No account/email gating or invented download promises.
- Content: public Instagram post inventory in INSTAGRAM-AUDIT.md. Source repo verified public through the GitHub connector. GUARD corrections reference PostgreSQL privilege/RLS documentation and git-revert documentation.
- Security: static assets only; no new write endpoints or backend secrets. Local-only checklist state. Escaped Markdown, self-hosted assets, narrow CSP and download attachment headers. The exact new hostname has no pre-existing DNS answer; the new Worker name was confirmed absent (Cloudflare code 10007).
- Independent verification: separate read-only verifier returned PASS, no blocker or major. Its primary-button contrast finding was fixed by using dark text on brand orange.
- Rollback: previous Worker/assets version for later releases. First release: detach only this new custom domain or dedicated Worker. See site/README.md.
- Ship decision: branch may be published and this dedicated static Worker deployed. Source branch must be available before live GitHub source links are claimed working. Live DNS/TLS, headers, redirects, downloads, missing-route behavior and browser checks remain the post-deploy acceptance steps.

## HTTPS correction gate

Independent verifier: PASS. Two Worker contract tests pass for path/query-preserving HTTP 308 and unchanged HTTPS asset delegation. Wrangler dry-run passes with the ASSETS binding. Copy-link actions use each page canonical URL, including from preview hosts. Generated runtime declarations and local Wrangler state are excluded from source control. Live acceptance follows the deployment.

## BILL, TEN, CONTEXT, TOOLS release (28 Oct 2026)

VERDICT: PASS. Merged main (the four new freebies) into the hub branch and added a page for each, a two-column card grid on the homepage, uppercase keyword redirects, sitemap entries and Markdown tables. `build` and `check` pass (8 pages, 88 local targets, 7 matching downloads); worker tests 2/2; Wrangler dry run passed. Checked at 375px: no page overflow, tables scroll inside their own box. Deployed version 5ac39e9d. Live: every new page 200 after the trailing-slash redirect, HTTP → HTTPS 308, downloads byte-identical and served as attachments, a missing path 404. Rollback: `npx wrangler@4.152.0 rollback`.
