<script lang="ts">
  let {
    text = "BUTTON",
    click = () => {},
    filled = true,
    href = "",
    class: className = "",
    children,
  }: {
    text?: string;
    click?: (event: MouseEvent) => void;
    filled?: boolean;
    href?: string;
    class?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

{#if href}
  <a
    {href}
    onclick={click}
    class="{filled
      ? 'hover:bg-white   hover:text-black'
      : 'hover:bg-dark text-dark hover:text-white active:bg-black '} border border-white w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 label {className ||
      ''}"
  >
    {#if children}{@render children()}{:else}{text}{/if}
  </a>
{:else}
  <button
    onclick={click}
    class="{filled
      ? 'bg-dark/80 hover:bg-dark/100 active:bg-black  text-white'
      : 'hover:bg-dark text-dark hover:text-white active:bg-black '} border border-dark w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 {className ||
      ''}"
  >
    {#if children}{@render children()}{:else}{text}{/if}
  </button>
{/if}

<style>
  button,
  a {
    display: inline-flex;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--White, #fff);
    text-align: center;
    font-feature-settings:
      "liga" off,
      "clig" off;
    font-family: Interstate;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    text-transform: uppercase;
  }
</style>
