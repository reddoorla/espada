<script lang="ts">
  // A local copy of @prismicio/svelte's kit PrismicPreview (reddoor-starter#188).
  // Upstream 2.2.x ends a preview with goto(url, { invalidateAll, noScroll }),
  // which kit 3 rejects in dev (goto_options_removed) and which resets scroll
  // in production. This copy passes { refreshAll: true, reset: false }, as
  // upstream's kit 3 PR (prismicio/prismic-svelte#64) does. Switch the import
  // back and delete this file once upstream ships a kit 3 release.
  import { beforeNavigate, goto, refreshAll } from "$app/navigation";
  import { getToolbarSrc } from "@prismicio/client";
  import { onMount } from "svelte";

  type Props = {
    repositoryName: string;
    routePrefix?: string;
    routePrefixName?: string;
  };

  const {
    repositoryName,
    routePrefix = "preview",
    routePrefixName = routePrefix,
  }: Props = $props();

  const toolbarSrc = $derived(getToolbarSrc(repositoryName));

  let endingPreview = $state(false);

  onMount(() => {
    const controller = new AbortController();

    window.addEventListener(
      "prismicPreviewUpdate",
      (event) => {
        event.preventDefault();
        refreshAll();
      },
      { signal: controller.signal },
    );
    window.addEventListener(
      "prismicPreviewEnd",
      (event) => {
        event.preventDefault();
        endingPreview = true;
        goto(
          new URL(
            window.location.pathname.replace(
              new RegExp(`^(/${routePrefix}/?$|/${routePrefix}/)`),
              "/",
            ),
            window.location.origin,
          ),
          { refreshAll: true, reset: false },
        );
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  });

  beforeNavigate((navigation) => {
    const fromParams: Record<string, string | undefined> = navigation.from?.params ?? {};
    if (
      navigation.to &&
      fromParams[routePrefixName] === routePrefix &&
      !(routePrefixName in (navigation.to.params || {}))
    ) {
      if (endingPreview) {
        endingPreview = false;
        return;
      }

      navigation.cancel();
      goto(new URL(routePrefix + navigation.to.url.pathname, navigation.to.url.origin));
    }
  });
</script>

<svelte:head>
  <script defer src={toolbarSrc}></script>
</svelte:head>
