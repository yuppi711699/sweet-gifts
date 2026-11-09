# Sweet Gifts

A responsive, frontend-first corporate candy gifting MVP for a personal, non-commercial partner demonstration. Built with Next.js 16.4.5 (stable npm release at setup), React 19.3, TypeScript in strict mode, Tailwind CSS 4, and Lucide. All prices are illustrative Canadian dollars.

## Run locally

Use Node.js 24 LTS (the project also supports Node 22.18+ and was verified with Node 26.8.2) and npm.

```bash
cd ~/Projects/sweet-gifts
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. If the server is already running, `npm ci` is unnecessary. No system-level installation is needed on the Mac where this project was built.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm test` uses Node's built-in test runner and TypeScript stripping. No test framework is needed. `npm start` serves the compiled production build. Stop a running development server before starting production on the same port.

## What is included

- Sticky header, mobile navigation, keyboard focus, skip link, and reduced-motion support.
- Product photography, three gift presentations, illustrative volume pricing, personalization options, event-order feature, four-step process, and accessible FAQ accordions.
- A live CAD calculator supporting any whole-number quantity of at least 25, with all four price tiers, arbitrary quantities, presets, and minimum-order validation.
- Calculator-to-quote prefill with an independently editable quote quantity and a freshly calculated subtotal.
- Accessible quote validation, a reviewable quote draft, and clipboard copying with a manual-copy fallback.
- An email-draft option when a real contact address is configured. No request is sent by the website, no payment is taken, and no order is confirmed.
- Self-hosted DM Sans and DM Serif Display fonts, responsive Next.js Image rendering, a gift favicon, and Open Graph / social metadata.

## Brand, pricing, and contact configuration

Edit `src/lib/config.ts` to rename the business in one place. Edit `src/lib/pricing.ts` to change the illustrative tiers, minimum quantity, or default quantity. Currency amounts are stored as integer Canadian cents. The calculator, price packages, form, and generated quote all use this shared pricing source.

The `.env.example` file documents two optional public build-time variables:

- `NEXT_PUBLIC_QUOTE_EMAIL`: a real business contact email. Leave blank for copy-only demo mode. An invalid address also keeps the site in demo mode. No business address is invented.
- `NEXT_PUBLIC_SITE_URL`: the actual HTTPS deployment URL for absolute social metadata. Vercel's generated deployment URL is used automatically when this is blank. Local development falls back to http://localhost:3000.

Set these in `.env.local` locally or the Vercel project environment settings. Restart the development server after changes and rebuild deployed versions. These values are public; never put API keys or secrets in a `NEXT_PUBLIC_` variable.

The quote flow is **Prepare My Quote → review → copy details**, or **Open Email Draft → review and send in your email app** when configured. A browser needs an email application or registered webmail handler to open a `mailto:` link. Copying is always available. Clipboard access generally requires HTTPS or localhost; if denied, the quote text is selected for manual copying. Very long email drafts may exceed an email client's URL limit, so copying is also the fallback for long requests.

No personal details are stored in localStorage, a server, or a database. The draft is derived from current form values and is hidden when those values change, so stale quotes are not presented as current. `src/lib/quote.ts` provides pure validation, draft formatting, and mailto generation; these can be reused behind a future server-side email integration.

The demo has `noindex, nofollow` metadata intentionally. Update that setting in `src/app/layout.tsx` when an approved commercial launch is ready. There are no invented reviews, customer logos, social profiles, contact details, or delivery promises.

## Product photographs

The following four supplied 1122 × 1402 PNGs were visually checked, then copied from `/Users/d/Downloads`. The originals were not modified. No stock or replacement product imagery is used.

- `ChatGPT Image Nov 9, 2026, 09_03_57 AM-1.png` → `public/images/hero.png`: one red candy gift cup.
- `ChatGPT Image Nov 9, 2026, 09_03_58 AM-2.png` → `public/images/details.png`: ribbon, wrapping, and candy close-up.
- `ChatGPT Image Nov 9, 2026, 09_03_59 AM-3.png` → `public/images/collection.png`: four gift cups.
- `ChatGPT Image Nov 9, 2026, 09_03_59 AM-4.png` → `public/images/bulk-orders.png`: a large group for event orders.

Next.js serves responsive AVIF/WebP variants where supported and reserves image space to avoid layout shifts. The hero is preloaded; other images load lazily. Fonts live under `src/app/fonts` with their SIL Open Font License files, and do not require external requests at build time or runtime.

## Publish to Vercel

This project uses the standard Next.js architecture. It needs no database, API keys, paid integrations, or custom deployment configuration. It has **not been deployed automatically**.

For this personal, non-commercial partner demo, use a personal Hobby account, subject to [Vercel's Hobby terms](https://vercel.com/legal/terms). Review the plan before any commercial use. See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) and [the Vercel CLI](https://vercel.com/docs/cli).

One direct deployment path is:

```bash
cd ~/Projects/sweet-gifts
npx vercel
```

1. Sign in to your own Vercel account when prompted.
2. Select your personal scope and create a project named `sweet-gifts` (or an available name).
3. Use this directory as the root. Keep the detected Next.js framework and default build settings.
4. For the partner demo, leave `NEXT_PUBLIC_QUOTE_EMAIL` blank. To enable email drafting later, add the real address in project environment settings and redeploy.
5. Review the preview deployment, then publish the approved demo:

```bash
npx vercel --prod
```

The resulting URL will use the available `project-name.vercel.app` format. Add the actual production URL as `NEXT_PUBLIC_SITE_URL` and redeploy if you want production-domain social metadata rather than deployment-domain metadata.

Alternatively, push this Git repository to your own Git provider and import it through [Vercel New Project](https://vercel.com/new), leaving the framework defaults unchanged. No Git remote has been created by this project.

## Verification

`tests/order.test.mjs` covers all price boundaries, package totals, arbitrary quantities, invalid quantities, CAD formatting, required and optional fields, impossible dates, quote contents, subject line breaks, and safely encoded email drafts. Browser verification is recorded separately in `VERIFICATION.md` after testing the rendered page.

The complete npm dependency audit was clean after updating the starter’s transitive `minimatch` dependency to its patched 11.x release. The explicit `overrides` entry in `package.json` keeps that fix in place. Build and dev scripts use Next.js’s supported Webpack path with Tailwind’s standard PostCSS integration; this avoids a local Turbopack process restriction. No paid services, authentication, analytics, database, payment integration, or live email delivery are configured.
