# Tech Lords resource hub

A static, branded front door for the existing public Tech Lords resources. Target domain: https://techlord.wordlordmedia.com . No database, form submission, account signup, analytics pixel or third-party runtime is required.

## Local

Node 22+ is recommended; Wrangler 4.152 requires it.

```sh
cd site
npm run build
npm run check
npm run dev
```

Preview: http://localhost:3185 . Local-only responsive preview: http://localhost:3185/__preview?width=390 . It uses a same-origin iframe to exercise real CSS breakpoints; that helper is never included in the deployed assets.

## Content

- GUARD and VIBE downloads are copied directly from the repository files at build time.
- `content/posts.json` holds the seven observed live Instagram posts. The homepage features the five carousels; each resource links back to its reel.
- `public/assets/` holds the original local font files, their OFL licenses, the generated branded share image and stills extracted from the owner's carousel masters.
- The traced TL polygons and halftone treatment come from the Tech Lords Remotion brand system. `build.mjs` exports both SVG marks.
- The raw Markdown is rendered with escaping, a narrow link protocol allowlist and no embedded HTML support. Keep raw `.md` files as the downloadable source of truth.
- GUARD checkmarks persist in localStorage on the visitor's device only. No progress data is sent to a server.
- A small Worker upgrades HTTP to HTTPS before delegating to the static asset binding.
- Copy-link controls always use the canonical branded URL, including on preview domains.
- Static response headers enforce self-hosted scripts/styles/fonts, prevent framing, and make the Markdown attachments download as files.

## Deploy

Run the WordLord production gate before publishing. Verify the intended Cloudflare account and hostname. Publish the source branch before deploying, because resource source links point to `codex/techlords-resource-hub` until the PR is merged. After merging, switch the single `branch` constant in `build.mjs` to `main` in a reviewed update.

```sh
npm run build
npm run check
npx wrangler@4.152.0 whoami
npx wrangler@4.152.0 deploy --dry-run
npx wrangler@4.152.0 deploy
```

Wrangler reads `wrangler.jsonc` in this directory. It uploads only `dist/` and configures the exact custom hostname `techlord.wordlordmedia.com`; it does not deploy the agency/admin projects. Do not use an existing hostname without checking for a conflict first.

## After deployment

Check HTTPS on `/`, `/guard`, `/vibe`, `/GARD`, each `/downloads/*.md`, `/sitemap.xml`, the social preview and a deliberately missing route. Check that downloaded text matches the source and that a missing path returns 404 rather than a false 200. Verify copy controls, FAQ toggles and local checklist progress in a browser.

Instagram setup drafts: `../docs/site/FAQ-AND-REPLIES.md`. No Instagram settings or messages are changed by a deploy.

## Rollback

For a subsequent release: `npx wrangler@4.152.0 rollback` restores the previous Worker/assets version. The repository commit preserves the prior source. On the first release there is no previous version: detach only the new `techlord.wordlordmedia.com` custom domain or remove this dedicated Worker if the launch must be withdrawn. Keep the WordLord apex and other subdomains untouched.

The code/resources are MIT; the bundled fonts retain their separate OFL licenses. Cover art and brand marks remain the owner's creative assets; third-party product marks shown in carousel thumbnails are not endorsements.
