export const prerender = "auto";

/** @param {import('./$types').LayoutServerLoadEvent} event */
export const load = async ({ cookies }) => {
  // An active Prismic preview session is signalled by this cookie: editors who
  // arrive via a Prismic preview link have it set, normal visitors never do. It
  // gates the Prismic toolbar so it only mounts for previewers (the toolbar sets
  // ~21 third-party cookies that otherwise hit every visitor and fail Lighthouse).
  const isPreviewSession = !!cookies.get("io.prismic.preview");

  return {
    isPreviewSession,
  };
};
