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
`/contact` fetching the _home_ document, so two routes claimed the title
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

## 2026-09-14 — The cockpit's "2 lead notifications bounced" is Espada's spam filter, not a dead address (reddoor-maintenance#783)

The fleet digest has carried one critical item for this site since 2026-09-11:
"Espada — 2 lead notifications bounced (14d) — check the point-of-contact
address." The address is fine. The two bounces are Espada's inbound mail
filter refusing the lead-notification emails as spam — their filter is more
selective than our submission screening, so a form entry we let through was
rejected on their side. The alarm's instruction is wrong for this case.

**Why the signal says what it says.** The whole bounce-tracking path in
reddoor-maintenance was built for this site: in July, `apm@` bounced 4 of 8
notifications with nothing alarming, so the Resend webhook now flips a
submission's `notify_status` to `bounced` and the cockpit fires at 2 bounces in
a 14-day window. It records only _that_ Resend reported a bounce, not the
receiving server's reason, so a dead mailbox and a content rejection by a spam
filter look identical once stored. The same signal that was designed to catch
July's problem fires today for a different cause, and nothing in the data can
tell the two apart.

**What clears it, and what does not.** Nothing operator-facing. Accepted Watch
Conditions only mute the yellow watch tier; the bounce alarm is an attention
item and bypasses it. `notify_status` has no acknowledged value. The alarm
ages out on its own once the bounced submissions leave the window, which for
these two is no later than 2026-09-25. The only immediate exit is a direct
write to the production `submissions` table, flipping the in-window rows from
`bounced` back to `sent` (the value they held before the webhook). That is
what happened, by row id, once the operator authorised it — the session's
sandbox had refused production database access until then, including the
read-only listing.

**What the rows said.** Espada has had four bounced notifications since the
bounce tracking went in: 2026-07-24, 2026-08-06, 2026-08-31 and 2026-09-11.
All four are the same shape — a sales pitch pasted into the contact form
(backpacks twice, virtual-assistant services, paid traffic) — and the two in
the window had already been marked spam by hand. Their spam scores were 30
and 55, under the auto-filter line, so the notification went out and Espada's
filter refused it. That is the whole mechanism: the client's filter catches
what our classifier scores as borderline. Eight Espada submissions since
2026-09-03 were auto-filtered with no notification sent, so the classifier is
catching most of this traffic; these two slipped under. The window is
date-based (`screenOutsSince` truncates to a day), which is why the 08-31 row
still counted on 09-14 although it was more than 14×24 hours old; both
in-window rows were flipped.

**What was filed.** reddoor-maintenance#783 asks for the fix that makes the
hand-run SQL unnecessary: store the webhook's bounce classification and the
receiving server's message on the submission, word the alarm by that
classification instead of always blaming the address, give the operator an
acknowledge action, and feed client-rejected submissions back into the spam
classifier so fewer of them are sent in the first place.

Nothing in this repo changed except this entry.
