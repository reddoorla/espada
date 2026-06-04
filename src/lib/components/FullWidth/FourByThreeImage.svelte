<script lang="ts">
  let {
    src = placeholder,
    alt = "",
    label = "",
    class: className = "",
  }: { src?: unknown; alt?: unknown; label?: unknown; class?: string } = $props();
  import placeholder from "$lib/assets/images/image_placeholder.svg";
  import Img from "@zerodevx/svelte-img";

  let rotationAngle = "36.8";
  let crossLength = "125%";
</script>

<div class="w-full relative {className || ''}">
  <div
    class="w-full aspect-[4/3] {src === placeholder
      ? 'border-light border-2 bg-light bg-opacity-25'
      : ''} rounded-sm flex items-center justify-center relative"
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
