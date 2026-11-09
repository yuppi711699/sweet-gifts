# Verification — November 9, 2026

Final project: `/Users/d/Projects/sweet-gifts`.

## Installation and code checks

- Node.js 26.8.2 and npm 11.19.1 were available on the Mac; no system installation was required.
- The stable npm starter resolved Next.js 16.4.5, React 19.3.0, and Tailwind CSS 4.3.5.
- A clean `npm ci` from the committed lockfile succeeded in the final project directory.
- `npm run lint`: passed with zero errors and zero warnings.
- `npm run typecheck`: passed with strict TypeScript enabled.
- `npm test`: all 9 tests passed, covering pricing boundaries, arbitrary quantities, minimum order validation, CAD formatting, quote validation, date validity, draft contents, subject line breaks, and encoded email drafts.
- `npm run build`: passed in the final directory. The root page, not-found page, and gift icon were prerendered successfully.
- `npm audit`: zero vulnerabilities after applying the documented minimatch override. This includes development dependencies.

The initial Turbopack build encountered a restricted local process bridge. The finished project uses Next.js’s supported Webpack compiler and Tailwind’s PostCSS integration. The final production build succeeds with the normal `npm run build` command.

## Browser checks actually performed

The rendered development page and final production build were inspected in the in-app browser. Responsive checks used browser viewport overrides rather than physical mobile devices.

- Desktop hero, photography, pricing, calculator, customization, quote form, and FAQ layouts were inspected visually. The mobile hero, expanded navigation, pricing cards, calculator, and customization content were also inspected visually.
- No horizontal overflow at viewport widths of 320, 390, 768, 1024, and 1440 pixels.
- Desktop and mobile production screenshots were saved, including 1440 × 1000 and 390 × 844 viewport checks.
- Mobile navigation opened, closed with Escape, restored focus to its toggle, and closed after selecting a navigation link.
- All internal anchor targets existed.
- All seven rendered product-image instances loaded successfully after scrolling through the page.
- The calculator returned the expected totals for quantities 25, 49, 50, 75, 99, 100, 137, 199, 200, and 275. An invalid quantity of 24 showed an error and disabled the order-request button.
- Selecting the 200-cup package updated the mobile calculator to CA$1,600.00.
- Requesting 137 cups prefilled the quote with 137 and CA$1,233.00, displayed a confirmation of the prefill, and focused the full-name field. This handoff was also checked in the final production build.
- An empty quote submission displayed the expected required-field errors and focused the first invalid field.
- A completed sample quote produced a reviewable draft. Clipboard copying succeeded, and the copied text was read back and checked.
- An event-date input issue was fixed by handling native input events as well as change events. The selected date, 2026-12-15, was verified in both the prepared and copied quote.
- Editing a completed quote hid its outdated draft until the request was prepared again.
- The FAQ opened on click and closed using Enter.
- The final production browser console had no warnings or errors.
- The preview was reset to an empty form and default quantities after testing. Temporary viewport overrides were cleared.

## Production HTTP and asset checks

- `GET /`: HTTP 200, HTML.
- `GET /icon.svg`: HTTP 200, SVG.
- All four `/_next/image` requests at width 640 and quality 85 returned HTTP 200 and AVIF content.
- Each of the four copied PNGs was SHA-256 checked against its original in Downloads; all were identical. Original files were left untouched.

## Intended demo limitations

No business email is configured, so the live local page clearly offers the copy-only quote demo. The mailto subject/body generator was verified by unit tests using reserved example.test addresses; no external email app was launched and no message was sent.

No backend, payments, confirmed orders, database, or live delivery arrangements are implemented. These are intentional MVP boundaries. Pricing is illustrative. There are no remaining local build or functional blockers observed in this verification.

The project is ready for the non-commercial partner demonstration and Vercel deployment described in README.md. No deployment, external Git remote, domain purchase, or paid service was created.
