// Single source of truth for the site's canonical origin: apex host, https, no
// `www`, no trailing slash. Import this wherever an absolute URL is needed
// (sitemap, canonical tags, OG/JSON-LD) so the origin is defined once and can't
// drift. Keep in sync with the production domain configured in Netlify.
export const SITE_URL = "https://espadarealestate.com";
