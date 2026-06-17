<script lang="ts">
  import { PrismicPreview } from "@prismicio/svelte/kit";
  import { page } from "$app/stores";
  import { repositoryName } from "$lib/prismicio";
  import "../app.css";
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import espadaLogo from "$lib/assets/icons/logos/espadaLogo.svg";
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { onNavigate } from "$app/navigation";
  import menu from "$lib/assets/icons/menu.svg";
  import close from "$lib/assets/icons/close.svg";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   * @property {import('./$types').LayoutData} [data]
   */

  /** @type {Props} */
  let { children, data } = $props();

  const NAV_LINKS = [
    {
      label: "Property Management",
      href: "/property-management",
    },
    {
      label: "Development & Investments",
      href: "/development-and-investments",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Investor Login",
      href: "/login",
    },
  ];

  let isOverlayVisible = $state(false);
  let isTransitioning = $state(true);

  onMount(() => {
    setTimeout(() => {
      isTransitioning = false;
    }, 1200);
  });

  onNavigate(() => {
    isTransitioning = true;

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  });
</script>

<svelte:head>
  <title>{$page.data.title ?? "Espada"}</title>
  {#if $page.data.meta_description}
    <meta name="description" content={$page.data.meta_description} />
  {/if}
  {#if $page.data.meta_title}
    <meta property="og:title" content={$page.data.meta_title} />
  {/if}
  {#if $page.data.meta_image}
    <meta property="og:image" content={$page.data.meta_image.url} />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if isTransitioning}
  <div
    class="bg-[#140F09] z-40 fixed w-screen h-screen top-0 left-0 pointer-events-none"
    out:fade={{ duration: 700 }}
  ></div>
{/if}

{#if isOverlayVisible}
  <div
    class="w-screen h-screen fixed bg-black flex flex-col items-center justify-center gap-12 z-30"
    transition:fly={{ y: "-100%" }}
  >
    {#each NAV_LINKS as item (item.href)}
      <a
        onclick={() => (isOverlayVisible = false)}
        href={item.href}
        class="text-white text-2xl nav-link hover:opacity-100 opacity-75">{item.label}</a
      >
    {/each}

    <button
      class="absolute top-5 right-5 opacity-60 hover:opacity-100 transition-all z-40"
      onclick={() => (isOverlayVisible = false)}
      aria-label="close overlay"
    >
      <div in:fade={{ delay: 600 }} out:fade class="text-white">
        <img class="w-9" src={close} alt="close" />
      </div>
    </button>
  </div>
{/if}
<main>
  <div class="h-16 w-screen">
    <ContentWidth class="flex flex-row justify-between items-center h-full">
      <a href="/" class="hover:opacity-80 transition-all duration-500 bump">
        <img src={espadaLogo} alt="logo" class="h-10" />
      </a>
      <div class="flex flex-row">
        <div class="hidden lg:flex flex-row justify-between items-center gap-10">
          {#each NAV_LINKS as item (item.href)}
            <a class="nav-link hover:opacity-100 opacity-75" href={item.href}>{item.label}</a>
          {/each}
        </div>

        <button
          class="lg:hidden ml-6 opacity-60 hover:opacity-100 transition-all"
          onclick={() => (isOverlayVisible = true)}
        >
          {#if !isOverlayVisible}
            <img class="w-9" src={menu} alt="menu" />
          {/if}
        </button>
      </div>
    </ContentWidth>
  </div>
  {@render children?.()}
</main>

{#if data.isPreviewSession}
  <PrismicPreview {repositoryName} />
{/if}
