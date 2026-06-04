# Morning brief — 2026-06-05

_Repo: espada · Branch: `modernize/espada-tailwind4-prismic2` (already merged to `main` via PR #5) · Read-only deep review._

## TL;DR

The two migrations landed cleanly at the **build + tooling** level — `pnpm build`, `svelte-check` (0 errors), `lint`, and `pnpm audit` all pass, and the Tailwind 3→4 conversion is genuinely thorough (no leftover `bg-opacity-*`, `flex-grow`, `rounded-sm`, `shadow-sm` v3-isms anywhere). Nothing is on fire. No secrets leaked, no data-loss risk, no CRITICAL findings.

The real story is **two live regressions hiding under a pile of dead code**, plus a **business-critical contact form that may not actually submit in production**. Most of the 75 svelte-check warnings are in ~20 components that no page imports — they're tree-shaken out and never shipped, which is good news (low impact) but bad signal (they mask the handful of warnings that are on _live_ components).

## Top of stack (do this first)

1. **Verify the contact form actually submits on the deployed site.** (~15 min) Submit a real test message on the live URL and check the Netlify dashboard → Forms. There is **no static HTML form fallback** and the site is SSR (adapter-netlify), which is the textbook setup where Netlify's build-time form scanner fails to register the form → silent submission failure. See HIGH-1. This is the one finding with direct revenue/lead impact.
2. **Fix the two live Svelte-5 reactivity/markup regressions** in `ScreenWidthImage` and the layout viewport/OG meta. (~30 min) See MEDIUM-1, MEDIUM-3, MEDIUM-4. These are on every page.
3. **Decide what to do with the ~20 dead components.** (~20 min) Either delete them or, if they're a deliberate "design library to wire up later," move them out of the build's reach and document that. Right now they generate ~60 of the 75 svelte-check warnings and bury the real ones. See HIGH-2 / LOW-1.

---

## Findings — CRITICAL

None. Build passes, no secrets committed (`.env*` gitignored, only `VITE_PRISMIC_ENVIRONMENT` referenced), no data-loss paths.

---

## Findings — HIGH

### HIGH-1 — Contact form is probably not registered with Netlify Forms (lead capture silently broken)

- **Where:** [src/lib/components/FullWidth/ContactForm.svelte:8-15](src/lib/components/FullWidth/ContactForm.svelte#L8-L15); contact page [src/routes/[[preview=preview]]/contact/+page.svelte:11](src/routes/%5B%5Bpreview=preview%5D%5D/contact/+page.svelte#L11)
- **What:** The form uses the bare `netlify` / `netlify-honeypot` attributes and is rendered via SSR. Netlify detects forms by scanning **static HTML at build time**; an SSR-only form produces no static HTML to scan, and there is **no static fallback form** anywhere in `static/` (confirmed). Submissions will likely POST to a path Netlify never provisioned → 404 / dropped.
- **Why it matters:** This is the site's only lead-capture path. If it's broken, inbound contact requests vanish with no error shown to the visitor.
- **Caveat:** I could not confirm this without deploying (read-only review). It's possible Netlify's newer detection handles it — hence "verify first."
- **Fix sketch:** Add a static hidden form for detection (a hardcoded `<form name="contact" netlify hidden>` with all field names in `static/` or `app.html`), OR prerender the contact route, OR switch to a Netlify function / form action. Confirm in Netlify dashboard → Forms that `contact` appears.

### HIGH-2 — ~20 of ~30 components are dead code (unimported, never shipped)

- **Where:** `src/lib/components/` — only these 9 are reachable from routes/layout: `ContentWidth`, `AnimateIn`, `Footer`, `DefaultButton`, `ContactForm`, `FourByThreeImage`, `SquareImage`, `ScreenWidthImage`, `SubHero`. **Unused:** `ScreenWidthGallerySliderLarge`, `ScreenWidthGallerySliderSmall`, `ScreenWidthImageSlider`, `ContentWidthGallerySlider`, `SliderOfContentBoxes`, `SliderOfTestimonialBoxes`, `TestimonialBox`, `ContentBox`, `TitleBox`, `ArrowButton`, `EmailSubmit`, `Accordian`, `ContactBox`, `SocialsRow`, `StyledSingleSelect`, `StyledMultiSelect`, `TeamBox`, `HalfWidthImage`, `Spacer`, `TriggerTransitionOnMount` (verify each before deleting).
- **Why it matters:** These carry the bulk of the 75 svelte-check warnings, several broken-on-Svelte-5 sliders (plain `let sliderIndex` instead of `$state` — they wouldn't animate if used), leftover `console.log(sliderIndex)` debug calls, and an invalid-HTML `<a>`-inside-`<a>` in `TeamBox`. **Because nothing imports them, they're tree-shaken out — zero runtime/bundle impact today.** The cost is purely signal: real warnings on live components hide in the noise, and the next dev can't tell intent ("library to wire up" vs "leftover starter cruft").
- **Fix sketch:** Confirm intent. If cruft → delete. If a deliberate component library → move to a `_lib/`-style excluded dir or document it in README so the warnings are understood as "not yet wired."

---

## Findings — MEDIUM

### MEDIUM-1 — `ScreenWidthImage` responsive fill broken by the Svelte-5 migration (LIVE, every hero)

- **Where:** [src/lib/components/ScreenWidth/ScreenWidthImage.svelte:30-34](src/lib/components/ScreenWidth/ScreenWidthImage.svelte#L30-L34)
- **What:** `viewportHeight`/`viewportWidth` are plain `let` (not `$state`), bound via `<svelte:window>`, and read by `fillHeight = $derived(viewportHeight*16 > viewportWidth*9)`. In Svelte 5 runes mode, mutating a non-`$state` variable does **not** re-run the `$derived`. svelte-check flags both as `non_reactive_update`. So `fillHeight` is stuck at its initial value (`0 > 0` → `false`) and never adapts to the real viewport.
- **Why it matters:** The hero image's aspect-fill branch (`h-screen min-w-full` vs `w-screen min-h-full`) is chosen once and never corrects. On portrait/narrow viewports the background image may not fill correctly. This is a regression introduced by the migration — the codemod missed this file.
- **Fix sketch:** `let viewportHeight = $state(0); let viewportWidth = $state(0);`. (Same pattern as `ScreenWidthImageSlider`, which the codemod _did_ convert correctly.)

### MEDIUM-2 — Dynamic Prismic page route has no 404 handling

- **Where:** [src/routes/[[preview=preview]]/[uid]/+page.server.js:8](src/routes/%5B%5Bpreview=preview%5D%5D/%5Buid%5D/+page.server.js#L8)
- **What:** `await client.getByUID("page", params.uid)` with no try/catch. `getByUID` throws on a missing document, producing a **500** instead of a proper 404 for any unknown path under `/`.
- **Why it matters:** Bad UX + SEO (500 vs 404) for typo'd or stale URLs; this catch-all route fires for `/anything`.
- **Fix sketch:** `import { error } from "@sveltejs/kit";` and wrap: `const page = await client.getByUID("page", params.uid).catch(() => { throw error(404, "Not found"); });`

### MEDIUM-3 — Open Graph tags use `name=` instead of `property=` (social previews won't render)

- **Where:** [src/routes/+layout.svelte:68](src/routes/+layout.svelte#L68) and [:71](src/routes/+layout.svelte#L71)
- **What:** `<meta name="og:title">` / `<meta name="og:image">`. The Open Graph spec requires `property="og:..."`. Facebook, LinkedIn, iMessage, etc. read `property`, not `name`, so they'll ignore these.
- **Why it matters:** This is a marketing site; broken link previews when the site is shared hurt reach.
- **Fix sketch:** Change `name=` → `property=` for the two `og:` tags. (`twitter:card` correctly stays on `name=`.)

### MEDIUM-4 — Viewport meta is malformed and blocks zoom (a11y / WCAG 1.4.4)

- **Where:** [src/routes/+layout.svelte:74](src/routes/+layout.svelte#L74)
- **What:** `content="width=device-width, initial-scale=1.0 user-scalable=no"` — missing comma before `user-scalable`, and `user-scalable=no` disables pinch-zoom (WCAG 1.4.4 failure). Your CI runs `reddoor-maint audit --only a11y --fail-on-violations`; if that audit crawls the real routes (not just `/dev/a11y-fixtures`), this may already be flagging or about to.
- **Fix sketch:** `content="width=device-width, initial-scale=1"` — drop `user-scalable=no` entirely.

### MEDIUM-5 — ContactForm input/submit handling is buggy

- **Where:** [src/lib/components/FullWidth/ContactForm.svelte:43](src/lib/components/FullWidth/ContactForm.svelte#L43), [:46](src/lib/components/FullWidth/ContactForm.svelte#L46), [:55-56](src/lib/components/FullWidth/ContactForm.svelte#L55-L56)
- **What:** (a) `type="phone"` is not a valid input type → falls back to text, losing the mobile numeric keypad (should be `type="tel"`). (b) `onclick={submit}` calls `form.submit()` (the DOM method), which **bypasses HTML5 validation and does not fire the `submit` event** — and the button, lacking an explicit `type`, also defaults to `type="submit"`, so you get conflicting submit paths. (c) Vestigial hidden `<input name="select" type="select">` (invalid type, bound to an unused `selectValue`) — dead remnant of a removed dropdown.
- **Fix sketch:** `type="tel"`; make the button `type="submit"` and delete the `onclick`/`submit` helper (let native submit run, which also restores validation and the Netlify flow); remove the dead `select` input. (Coordinate with HIGH-1.)

---

## Findings — LOW

- **LOW-1 — svelte-check warnings don't fail CI.** [.github/workflows/ci.yml](.github/workflows/ci.yml) runs `svelte-check`, but it exits 0 when there are only warnings (0 errors today). That's why 75 warnings accumulated unnoticed. Consider `--fail-on-warnings` _after_ the dead-code cleanup (HIGH-2), or you'll just gate on noise.
- **LOW-2 — `md:p8` invalid class.** [src/lib/slices/RichText/index.svelte:16](src/lib/slices/RichText/index.svelte#L16) — should be `md:p-8`; the class is silently dropped so the rich-text slice loses its desktop padding.
- **LOW-3 — `text-2x` and `nav-links` typos (LIVE, mobile menu).** [src/routes/+layout.svelte:93](src/routes/+layout.svelte#L93) — should be `text-2xl` and `nav-link` (singular; the CSS class in [app.css:194](src/app.css#L194) is `.nav-link`). The mobile overlay nav links render unstyled/wrong-size; the desktop nav (line 117) is correct.
- **LOW-4 — `items center` typo in `TeamBox`** (dead component) — [TeamBox.svelte:44](src/lib/components/FullWidth/TeamBox.svelte#L44) & [:70](src/lib/components/FullWidth/TeamBox.svelte#L70), should be `items-center`. Only matters if TeamBox is revived.
- **LOW-5 — `console.log(sliderIndex)` left in 3 (dead) slider components.** `ScreenWidthImageSlider`, `ScreenWidthGallerySliderSmall`, `SliderOfContentBoxes`, `SliderOfTestimonialBoxes`. Clean up with HIGH-2.
- **LOW-6 — README is generic starter boilerplate**, not Espada-specific ("Reddoor Wireframer and Site Scaffold"). `package.json` `name` is still `sveltekit-starter-prismic-minimal`. Doc/identity drift.
- **LOW-7 — `@media (max-width: 786px)`** in [app.css:208](src/app.css#L208) is almost certainly meant to be `768px` (matches the `md` breakpoint); leaves an 18px dead zone. Also several empty `h2{}…a{}` rules in that block (lines 214-230) — dead CSS.
- **LOW-8 — Stale boilerplate TODO** in [src/lib/prismicio.js:17](src/lib/prismicio.js#L17) ("Update the routes array…"). The routes array is functional (home + `:uid`); just delete the comment.
- **LOW-9 — tsconfig warning:** `Cannot find type definition file for 'node'` (svelte-check line, [tsconfig.json](tsconfig.json)). Harmless but noisy; either add `@types/node` or drop `node` from the inherited `types`.
- **LOW-10 — `/dev/a11y-fixtures` ships in the production build.** [src/routes/dev/a11y-fixtures/+page.svelte](src/routes/dev/a11y-fixtures/+page.svelte) is a test fixture page that's publicly reachable in prod. Intentional for the CI a11y crawl? If not, gate it behind `dev` or exclude from the build.
- **LOW-11 — `npm audit`: 10 vulns (3 high / 4 moderate / 3 low), all dev/build-time tooling.** Chains: `@lhci/cli` (tmp, html-minifier, uuid, file-type), `@slicemachine/adapter-sveltekit` (uuid), `@sveltejs/kit > cookie` (low). **No runtime exposure** — these don't ship to visitors. Renovate (Mondays, automerge minor/patch) will clear most. The 3 "high" (html-minifier REDoS, tmp path traversal) are in build tooling only.
- **LOW-12 — No unit/integration tests.** Only gates are the a11y audit + lighthouse. Slider logic, Prismic rendering, and form submission have no test coverage. Acceptable for a small marketing site, but note it before adding complexity.
- **LOW-13 — `$app/stores` `page` is deprecated** in current SvelteKit (favor `$app/state`). [src/routes/+layout.svelte:3](src/routes/+layout.svelte#L3). Works today; bump when convenient.
- **LOW-14 — `Label.svelte` applies CMS label as a raw CSS class.** [src/lib/slices/RichText/Label.svelte:15](src/lib/slices/RichText/Label.svelte#L15) `class={node.data.label}` — if an editor ever uses a Tailwind class name as a Prismic label, it won't be generated (not in the `@source inline` safelist). Low risk; just be aware.

---

## Open loops carried forward

- **Contact form deploy verification (HIGH-1)** is intentionally NOT resolved tonight — it requires a live deploy + Netlify dashboard check, which is outside this read-only review. It's the #1 morning action.
- **Dead-component decision (HIGH-2)** needs your intent, not mine — I won't guess whether the slider/select library is "delete" or "wire up later." Flagged, not acted on.
- The `reddoor-maint audit --only a11y` CI step — I confirmed it exists and gates on violations, but did **not** run it locally (it needs `playwright install --with-deps chromium`, a heavier step) nor confirm exactly which routes it crawls. Worth a one-time local run to see whether MEDIUM-4 (viewport) is already caught.

## Decisions deferred

- **Whether to delete vs preserve the ~20 dead components.** Provisional call if you don't get to it: leave them, but add `--fail-on-warnings` only _after_ deciding, so CI doesn't lock onto noise. (HIGH-2 / LOW-1.)
- **Whether `/dev/a11y-fixtures` is meant to be public.** Provisional: assume intentional (feeds the CI a11y crawl); leave it. (LOW-10.)

## What I did NOT do tonight

Read-only review. **No commits, no PRs, no pushes, no live-service writes, no fixes applied.** The repo state is exactly as you left it (working tree clean on `modernize/espada-tailwind4-prismic2`). I ran local gates only (`svelte-check`, `lint`, `pnpm build`, `pnpm audit`) — none mutate shared state. The only file I created is this brief plus `.claude/settings.local.json` (the read-only allowlist you approved before stepping out).

---

### Gate results (run tonight, local)

| Gate                            | Result                                                                                                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm build`                    | ✅ pass (1m13s, adapter-netlify)                                                                                                                                                                                          |
| `svelte-check`                  | ✅ 0 errors, ⚠️ 75 warnings / 19 files (mostly dead components)                                                                                                                                                           |
| `pnpm lint` (prettier + eslint) | ✅ pass                                                                                                                                                                                                                   |
| `pnpm audit`                    | ⚠️ 10 vulns, all dev/build-time (see LOW-11)                                                                                                                                                                              |
| Git archaeology                 | clean tree; branch merged to main via PR #5; 1 stale branch (`fleet-onboarding`) holds a pre-migration "added alt text" commit — **superseded, not lost work** (its content is old Svelte-4/TW3 syntax, already replaced) |
