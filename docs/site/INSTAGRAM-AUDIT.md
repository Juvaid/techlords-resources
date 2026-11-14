# Tech Lords public Instagram audit

Observed 24 October 2026, India time, on the logged-out public profile https://www.instagram.com/techlordsbywlm/ . This is a public content and resource-delivery audit, not an Insights/retention audit. No messages, posts, comments or profile settings were changed.

## Published inventory

| Format | Post | Public caption observed | Resource delivery |
| --- | --- | --- | --- |
| Reel | https://www.instagram.com/techlordsbywlm/reel/De4Ojl3NpTt/ | “Bhai… production database khaali hai.” Three rules and a GUARD comment CTA. | Direct checklist page: https://techlord.wordlordmedia.com/guard |
| Carousel | https://www.instagram.com/techlordsbywlm/p/De1ee4Ak9b1/ | “October open source news” | Post link in hub |
| Carousel | https://www.instagram.com/techlordsbywlm/p/De1WSWVk-VJ/ | “You can now talk with dna” | Post link in hub |
| Carousel | https://www.instagram.com/techlordsbywlm/p/De1VXjak5Zk/ | “Litellm got compromised twice in single year” | Post link in hub |
| Carousel | https://www.instagram.com/techlordsbywlm/p/De1UBJGk93-/ | “OpenAi x Google / chatgpt models now available on Google cloud” | Post link in hub |
| Carousel | https://www.instagram.com/techlordsbywlm/p/De1JeDPEz2x/ | “Claude duet has arrived after dots, muse and grok bot” | Post link in hub |
| Reel | https://www.instagram.com/techlordsbywlm/reel/DezBfzYRqOw/ | “Vibe coding origin” | Direct templates page: https://techlord.wordlordmedia.com/vibe |

The public profile showed two reels and five carousels. The profile bio visible in this view was “AI Agents & tools , bina bakwaas”. No external resource URL was visible in that logged-out profile view. Confirm the editable profile before concluding whether a hidden/collapsed link exists.

## What needs attention

1. **Fulfil the published promises first.** GUARD is explicitly offered by DM, and VIBE is promised in the reel script. The existing public repository already contains both. The new hub gives each keyword a short URL and a direct file download, with no email requirement.
2. **Handle the spelling people actually use.** Public GUARD comments included “Gard” variants. `/gard` and `/GARD` redirect to `/guard`. If automation is configured later, include GUARD/GARD and case-insensitive VIBE matching; no automation has been configured here.
3. **Bring the captions up to the reel's standard.** Five carousel captions and the first reel caption are short labels, whereas the current GUARD caption gives the problem, useful advice and an action. For future posts, add one accurate takeaway, why it matters, and the relevant resource/source link direction. Keep time-sensitive eligibility and preview qualifiers.
4. **Distinguish sources from freebies.** The five news carousels link to their actual Instagram posts. They are not labelled as templates or given invented downloads. Additional source pages can be added only after checking the original URLs and current facts.
5. **Make one bio destination useful.** Set the hub URL in the profile and a Resources highlight after deployment. Use the per-resource URLs in FAQ/saved replies so people skip the homepage when they already asked for a specific file.

## Resource audit corrections

The GUARD checklist previously implied that a WHERE clause could be enforced merely by a database role, recommended indiscriminate staging and a hard reset, and suggested that every mistake was reversible in a minute. The branch corrects those points: restricted non-owner roles, reviewed row policies where relevant, selective staging, history-preserving revert, and separate tested database recovery. Prompt instructions are explicitly not an access-control boundary.

Primary references: https://www.postgresql.org/docs/current/ddl-priv.html , https://www.postgresql.org/docs/current/ddl-rowsecurity.html , https://git-scm.com/docs/git-revert .

## Next measurement

After the link is used, inspect Instagram Insights for profile visits, external-link taps, saves, shares and reel retention. No reach, conversion or retention conclusions are possible from the public page alone. The hub has no third-party analytics or tracking pixels in this release.
