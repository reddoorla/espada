<script lang="ts">
  import { SliceSimulator } from "@slicemachine/adapter-sveltekit/simulator";
  import { SliceZone } from "@prismicio/svelte";
  import { components } from "$lib/slices";
  import type { SliceZone as SliceZoneType } from "@prismicio/client";
</script>

<SliceSimulator>
  {#snippet children({ slices }: { slices: SliceZoneType })}
    <SliceZone {slices} {components} />
  {/snippet}
</SliceSimulator>
