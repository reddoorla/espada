# Espada — Work Journal

Running log of build work: what was done, why, and where it landed.
Chronological — newest entry at the bottom. The [README](../README.md) says what
the stack is; this is the history of getting it there.

The convention is in [CLAUDE.md](../CLAUDE.md) under "The work journal". In
short: every working session appends a dated entry, prose over bullets, why
over what, and history is never edited to be right — a later entry corrects an
earlier one and says so.

---

## 2026-09-05 — Journal opened, and 131 commits of history summarised rather than reconstructed (`chore/work-journal`)

The journal starts today, so this first entry is a **backfill**: a deliberately
coarse summary of what came before, written from the commit log rather than
from memory. Detail below this line is trustworthy; detail above it is not, and
nothing here should be cited as though someone wrote it down at the time. The
commit log remains the record for anything before 2026-09-05.

**What this repo is.** The marketing site for Espada — "a diversified
commercial real estate firm with deep roots in San Antonio, Texas & beyond", in
the home page's own words — at `espadarealestate.com`. SvelteKit 2 / Svelte 5 /
Tailwind v4 / Prismic, deployed on Netlify. 131 commits, 2024-11-18 to
2026-09-01.

**The eras, roughly.** The first 26 commits are the original build, and they
run from `initial commit` to a live five-page site in three weeks of
November 2024 — terse lowercase messages, npm, no CI, no tests, pages written
by hand. Then 2025 goes nearly dormant: **seven commits in the entire year**,
all of them small — mobile fixes, an image swap, a `robots.txt`.

The repo's real engineering is 2026, and it is a retrofit rather than a
rewrite. May and June carry 61 commits of it: npm → pnpm, onboarding to
`@reddoorla/maintenance` and its shared configs, Svelte 4 → 5 codemods across
35 files, Vite 5 → 6, then Tailwind 3 → 4 and Prismic v1 → v2 back to back
(#5), eslint 8 → 10, `adapter-auto` → `adapter-netlify`, and **21 dead
components deleted** (#6) — they were generating roughly 60 of the 75
svelte-check warnings and burying the ones on live components. July is
hardening: a `/health` endpoint, the smoke suite, Turnstile on the contact form, a
Prismic-backed `sitemap.xml`, and three SEO defects that had shipped silently —
`og:image` rendering as `undefined`, pages with no meta description, and
`/contact` fetching the *home* document, so two routes claimed the title
"Espada". August and September are almost entirely dependency and CI work.

**One thing worth pulling forward.** `docs/morning-reports/MORNING_REPORT_2026-06-05.md`
predicted that the contact form was capturing no leads at all: it used the
bare `netlify` attributes, but Netlify detects forms by scanning static HTML at
build time and this site is SSR with no static fallback. Eleven days later the
form moved onto the fleet's central ingest (#12). Whether submissions were in
fact being dropped for the eighteen months before that was never confirmed —
the review inferred it from the setup, and the fix removed the question rather
than answering it.

**State as of this entry.** `main` at `ead3fab`, tree clean, nothing in flight.
Twenty-one merged feature and Renovate branches are still on the remote,
undeleted; none of them is work in progress.

**What changed today.** This file, and a `CLAUDE.md`, which this repo did not
have — the retrofit gave it the fleet's tooling but never the fleet's session
notes, so the shape of this particular site has had to be rediscovered from
source each time.
