import { createSvelteConfig } from "@reddoorla/maintenance/configs/svelte";
import adapter from "@sveltejs/adapter-netlify";

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
