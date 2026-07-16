import { createClient } from "$lib/prismicio";
// Import the canonical origin from its single source of truth — never re-hardcode
// it here. Duplicating the origin is how sibling sites grew a stale-`www` drift
// bug: the sitemap kept emitting the old host after the canonical constant moved.
import { SITE_URL } from "$lib/site";

// Prerendered alongside the rest of the site, so it's a static file Netlify serves.
export const prerender = true;

// Prismic document type -> public path. `page` is the only type; the home doc
// lives at `/`, every other `page` doc renders at `/<uid>`. The named route
// folders (/about, /contact, /property-management, /login,
// /development-and-investments) each render the `page` doc of that same UID, so
// this one mapping covers every public route.
/** @type {Record<string, (uid: string) => string>} */
const TYPE_PATHS = {
  page: (uid) => (uid === "home" ? "/" : `/${uid}`),
};

export async function GET({ fetch }) {
  const client = createClient({ fetch });
  const docs = await client.dangerouslyGetAll().catch(() => []);

  const seen = new Set();
  const urls = [];
  for (const doc of docs) {
    const build = TYPE_PATHS[doc.type];
    if (!build || !doc.uid) continue;
    const loc = SITE_URL + build(doc.uid);
    if (seen.has(loc)) continue;
    seen.add(loc);
    const lastmod = doc.last_publication_date?.slice(0, 10);
    urls.push(
      `\t<url>\n\t\t<loc>${loc}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ""}\n\t</url>`,
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
