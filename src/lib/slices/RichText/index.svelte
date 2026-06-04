<script>
  import { PrismicRichText } from "@prismicio/svelte";
  import Label from "./Label.svelte";

  /**
   * @typedef {Object} Props
   * @property {import("@prismicio/client").Content.RichTextSlice} slice
   */

  /** @type {Props} */
  let { slice } = $props();

  // @prismicio/svelte@1.5 types `components` as a Svelte 4 component class
  // (`new (...args) => SvelteComponent<...>`). Svelte 5 components compile to the
  // functional `Component<...>` type, which TS will not match against that
  // constructor signature. Cast the map (via `unknown`) to the constructor-style
  // record the library expects; the runtime value and rendered output are unchanged.
  const richTextComponents = /** @type {Record<string, import("svelte").ComponentType>} */ (
    /** @type {unknown} */ ({ label: Label })
  );
</script>

<section class="container p-2 md:p8">
  <PrismicRichText field={slice.primary.content} components={richTextComponents} />
</section>

<style>
  .container {
    max-width: 600px;
    margin: 6em auto;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>
