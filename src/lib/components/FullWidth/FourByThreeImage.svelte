<script lang="ts">
  let {
    src = placeholder,
    alt = "",
    label = "",
    class: className = "",
  }: { src?: ImageSource; alt?: string; label?: string; class?: string } = $props();
  import type { ImageSource } from "$lib/types";
  import placeholder from "$lib/assets/images/image_placeholder.svg";
  import Img from "@zerodevx/svelte-img";
</script>

<div class="w-full relative {className || ''}">
  <div
    class="w-full aspect-4/3 {src === placeholder
      ? 'border-light border-2 bg-light/25'
      : ''} rounded-xs flex items-center justify-center relative"
  >
    {#if typeof src === "object"}
      <Img
        {src}
        {alt}
        class="z-10 object-cover w-full h-full"
        loading="eager"
        fetchpriority="low"
        decoding="async"
      />
    {:else}
      <img
        {src}
        {alt}
        class="z-10 object-cover w-full h-full"
        loading="eager"
        fetchpriority="low"
        decoding="async"
      />
    {/if}
    <h6 class="absolute bottom-4 z-20">{label}</h6>
  </div>
</div>
