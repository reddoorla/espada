<script lang="ts">
  let {
    src = placeholder,
    altText = "background image",
    placeholderSide = "right",
    vimeoId = "",
    darken = false,
    backdrop = false,
    class: className = "",
  }: {
    src?: ImageSource;
    altText?: string;
    placeholderSide?: "left" | "right";
    vimeoId?: string;
    darken?: boolean;
    backdrop?: boolean;
    class?: string;
  } = $props();
  import type { ImageSource } from "$lib/types";
  import placeholder from "../../assets/images/background_placeholder.svg";
  import ContentWidth from "../ContentWidth/ContentWidth.svelte";
  import Img from "@zerodevx/svelte-img";

  // `src === placeholder` is checked inside the `typeof src === "object"` branch,
  // where `src` is narrowed to `object` while `placeholder` is a `string` import,
  // so a direct comparison reads as a no-overlap mistake. Compute it once here
  // (comparing the original ImageSource-typed `src`) to preserve behavior.
  const isPlaceholder = $derived(src === placeholder);

  let viewportHeight = 0;
  let viewportWidth = 0;

  // Determine if image should fill viewport based on aspect ratio
  let fillHeight = $derived(viewportHeight * 16 > viewportWidth * 9);
</script>

<svelte:window bind:innerHeight={viewportHeight} bind:innerWidth={viewportWidth} />

<section
  class="h-screen w-screen overflow-clip {backdrop ? 'fixed -z-10 top-0 left-0' : 'relative'}"
>
  <div
    class="right-0 left-0 overflow-clip max-h-screen aspect-video relative {fillHeight
      ? 'h-screen min-w-full'
      : 'w-screen min-h-full'}"
  >
    {#if typeof src === "object"}
      <Img
        {src}
        sizes={isPlaceholder ? "(min-width: 1024px) 45vw, 100vw" : "100vw"}
        alt={altText}
        class="absolute bottom-0 {placeholderSide}-0 h-full w-full object-cover {isPlaceholder
          ? 'lg:w-[45%] md:h-auto'
          : ''} -z-10"
        loading="eager"
        fetchpriority={backdrop ? "high" : "low"}
      />
    {:else}
      <img
        {src}
        sizes={isPlaceholder ? "(min-width: 1024px) 45vw, 100vw" : "100vw"}
        alt={altText}
        class="absolute bottom-0 {placeholderSide}-0 h-full w-full object-cover {isPlaceholder
          ? 'lg:w-[45%] md:h-auto'
          : ''} -z-10"
        loading="eager"
        fetchpriority={backdrop ? "high" : "low"}
      />
    {/if}
    {#if vimeoId}
      <iframe
        title="background video"
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&muted=1&loop=1&autoplay=1`}
        class="aspect-video absolute {fillHeight
          ? 'h-screen min-w-full'
          : 'w-screen min-h-full'} contrast-[1.15] -z-10"
        frameborder="0"
        allowfullscreen
      ></iframe>
    {/if}
    {#if darken}
      <div
        class="bg-darken-gradient pointer-events-none absolute w-full h-full top-0 left-0 -z-10"
      ></div>
    {/if}
    <div class="w-screen h-screen absolute top-0 left-0">
      <ContentWidth class="{className || 'flex items-center justify-center'} h-full">
        <slot />
      </ContentWidth>
    </div>
  </div>
</section>

<style>
  .bg-darken-gradient {
    background: linear-gradient(180deg, rgba(203, 195, 164, 0.2) 33.5%, #656f5c15 100%);
    background-blend-mode: multiply;
  }
</style>
