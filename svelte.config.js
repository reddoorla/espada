import { createSvelteConfig } from "@reddoorla/maintenance/configs/svelte";
import adapter from "@sveltejs/adapter-netlify";

// VITE_REDDOOR_GATE_FIXTURES=1 builds the /dev fixtures into the bundle, for
// the a11y gate's own build and nothing else (src/routes/dev/+layout.server.ts,
// reddoor-maintenance#948). Set on Netlify it would deploy them, so refuse it
// there, at module load.
if (process.env.VITE_REDDOOR_GATE_FIXTURES && process.env.NETLIFY) {
  throw new Error(
    "VITE_REDDOOR_GATE_FIXTURES is set on Netlify: it builds the /dev fixtures into the " +
      "deployed site. It belongs to the a11y gate's own build (reddoor-maint audit) only. " +
      "Unset it in the Netlify environment.",
  );
}

/** @type {import('@sveltejs/kit').Config} */
export default createSvelteConfig({
  kit: {
    adapter: adapter({ edge: false, split: false }),
    prerender: {
      // The `[uid]` route enumerates every Prismic `page` (incl. the "contact"
      // UID) and emits `/contact` as a prerender entry. The dedicated
      // `/contact` route is now `prerender = false` (it hosts a form action),
      // so that generated entry no longer matches a prerenderable route. Ignore
      // the mismatch — `/contact` is served dynamically by its own route.
      handleEntryGeneratorMismatch: "ignore",
    },
  },
});
