# CLAUDE.md

Session rules for AI agents working on **Espada** — the marketing site for a
diversified commercial real estate firm in San Antonio, Texas
(`espadarealestate.com`). SvelteKit 2 / Svelte 5 / Tailwind v4 / Prismic, on
Netlify. [README.md](README.md) covers the stack; this covers what is easy to
get wrong.

## Commands

`pnpm dev` (Vite + Slice Machine), `pnpm build`, `pnpm check` (svelte-check),
`pnpm lint` (prettier + eslint), `pnpm test` (Playwright smoke). **There is no
`pnpm verify` here** — unlike the fleet starter, this repo never grew one, so
run the four gates yourself before pushing. CI is the org's reusable workflow
(`reddoorla/.github`), pinned by SHA in `.github/workflows/ci.yml`.

## Traps

- **Most page copy is hardcoded in the route files**, not in Prismic. The named
  routes under `src/routes/[[preview=preview]]/` (`about`, `contact`,
  `property-management`, `development-and-investments`, `login`) are
  hand-written Svelte with imported images; Prismic supplies their title and
  meta fields and little else. Editing that copy means editing code.
- **The `[uid]` catch-all renders nothing.** Its `+page.svelte` is an empty
  `<script></script>`, but its `entries()` enumerates every `page` document and
  `sitemap.xml` lists every one. A `page` doc whose uid has no matching named
  route folder therefore ships as a blank prerendered URL that is advertised to
  crawlers. Add the route folder, or don't publish the document.
- **`src/lib/slices/index.js` and `src/prismicio-types.d.ts` are generated** by
  Slice Machine. The types file is in `.prettierignore` on purpose — a prettier
  bump reformats it and reds `--check` on unrelated dep PRs.
- **`.github/workflows/prismic-models.yml` is managed by
  `@reddoorla/maintenance`** (`reddoor-maint prismic-ci`). Change it there and
  re-run; edits here get overwritten. Its `push:` branch filter is load-bearing
  — see the comment in the file.

## The work journal

**Every working session appends a dated entry to `docs/workJournal.md`** — what
was done and **why**, newest at the bottom, never corrected in place. Write it
as the last act of the session, not the first act of the next one.

The journal is the history of executing the build. Code says what the system
does now; the journal says what it used to do, what it cost to change, and
which beliefs turned out to be wrong. Nearly everything expensive to rediscover
lives there and nowhere else.

An entry is headed with the date, a short title, and where it landed:

```markdown
## 2026-09-04 — Both runway stages render their final frame without JS (#51, `ce46ae0`)
```

Then prose — not a bullet list of file names, which the diff already tells you.
What to put in, in rough order of value:

- **Why, over what.** The reason a thing was done survives; the diff does not
  need restating.
- **Measured numbers, exactly.** "The comp's open mask is 2696×2352 on an 860px
  band — 2.735× the band's height, so a 390×664 phone needs ~534%" is worth
  keeping. "Fixed the hero on mobile" is not.
- **Defects, named.** What broke, what it looked like, and what made it
  invisible until it wasn't.
- **What was tried and abandoned**, and what it would take to revive it. A dead
  end nobody wrote down gets walked twice.
- **Beliefs corrected on contact.** The design assumption that turned out false
  is usually the most valuable line in the entry.
- **Honest accounting.** If a win came from somewhere other than the change
  that claimed it, say so — that is exactly what someone will otherwise
  over-invest in next.

**History is never edited to be right.** An entry that stops being true is not
rewritten; a later entry corrects it, and says which one it corrects. The
journal is a record of what was believed at the time, and that record is most
useful precisely where it was wrong. Fixing the past in place destroys the only
evidence of how the mistake was made.

If a session produced nothing worth an entry, that is itself worth one line.
