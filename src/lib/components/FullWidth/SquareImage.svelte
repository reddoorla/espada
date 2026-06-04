<script lang="ts">
  let {
    src = placeholder,
    alt = "",
    class: className = "",
  }: { src?: unknown; alt?: unknown; class?: string } = $props();
  import placeholder from "$lib/assets/images/image_placeholder.svg";
  import Img from "@zerodevx/svelte-img";

  const rotationAngle = "45";
  const crossLength = "141%";
</script>

<div class="w-full {className || ''}">
  <div
    class="w-full aspect-square {src === placeholder
      ? 'border-light border-2 bg-light bg-opacity-25'
      : ''} rounded-sm flex items-center justify-center relative"
  >
    {#if typeof src === "object"}
      <Img
        {src}
        {alt}
        sizes="(min-width: 1024px) 1024px, 100vw"
        class="z-10 object-cover {src == placeholder ? 'w-16 bg-[#F2F5F7]' : 'w-full h-full'}"
        decoding="async"
      />
    {:else}
      <img
        {src}
        {alt}
        sizes="(min-width: 1024px) 1024px, 100vw"
        class="z-10 object-cover {src == placeholder ? 'w-16 bg-[#F2F5F7]' : 'w-full h-full'}"
        decoding="async"
      />
    {/if}
    <div
      class="absolute bg-light h-[2px] {src === placeholder ? '' : 'hidden'}"
      style="transform: rotate({rotationAngle}deg); width:{crossLength}"
    ></div>
    <div
      class="absolute bg-light h-[2px] {src === placeholder ? '' : 'hidden'}"
      style="transform: rotate(-{rotationAngle}deg); width:{crossLength}"
    ></div>
  </div>
</div>
