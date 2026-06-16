import { asText } from "@prismicio/client";
import { env } from "$env/dynamic/private";
import { createIngestAction } from "@reddoorla/maintenance/forms";

import { createClient } from "$lib/prismicio";

import type { Actions, PageServerLoad } from "./$types";

// The root layout sets `prerender = "auto"`; a form `action` cannot run on a
// prerendered route ("Cannot prerender pages with actions"). Opt out — this
// route is genuinely dynamic.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const client = createClient({ fetch, cookies });

  const page = await client.getByUID("page", "home");

  return {
    page,
    title: asText(page.data.title),
    meta_description: page.data.meta_description,
    meta_title: page.data.meta_title,
    meta_image: page.data.meta_image.url,
    // Plant a per-request timestamp for the bot timing screen.
    formTs: Date.now(),
  };
};

export const actions: Actions = {
  default: createIngestAction({
    formType: "contact",
    getConfig: () => ({
      url: env.FORMS_INGEST_URL,
      token: env.FORMS_INGEST_TOKEN,
    }),
    buildPayload: (form, event) => ({
      name: [form.get("firstName")?.toString(), form.get("lastName")?.toString()]
        .filter(Boolean)
        .join(" "),
      email: form.get("email")?.toString(),
      phone: form.get("phone")?.toString(),
      message: form.get("message")?.toString(),
      // Full URL incl. query string so UTM/campaign params (?utm_source=…) are captured.
      sourceUrl: event.url.href,
    }),
  }),
};
