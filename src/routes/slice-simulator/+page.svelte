<script lang="ts">
  import { SliceSimulator } from "@slicemachine/adapter-sveltekit/simulator";
  import { SliceZone } from "@prismicio/svelte";
  import { components } from "$lib/slices";
  import type { ComponentType } from "svelte";
  import type { SliceZone as SliceZoneType } from "@prismicio/client";

  // The generated `components` map and the SliceSimulator/SliceZone props are
  // typed for Svelte 4 (component classes + slots) in @prismicio/svelte@1.5 and
  // @slicemachine/adapter-sveltekit, so the Svelte 5 component values and the
  // snippet's `slices` argument don't line up with the shipped types. Cast to the
  // props' expected types; runtime/render behavior is unchanged.
  const sliceZoneComponents = components as unknown as Record<string, ComponentType>;
</script>

<SliceSimulator>
  {#snippet children({ slices }: { slices: SliceZoneType })}
    <SliceZone {slices} components={sliceZoneComponents} />
  {/snippet}
</SliceSimulator>
