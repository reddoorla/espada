<script lang="ts">
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
  import DefaultButton from "../Buttons/DefaultButton.svelte";

  // FontAwesomeIcon forwards unknown props via `$$restProps` at runtime, but its
  // typed props omit `color` (and provide no index signature). Spread the extra
  // forwarded attribute as a Record so the type checker accepts it without
  // changing the rendered output.
  const iconExtraAttrs: Record<string, string> = { color: "#ffffff" };
</script>

<form class="w-full flex items-center justify-center">
  <div class="flex flex-col md:flex-row text-light items-center justify-center">
    <div class="flex items-center justify-center">
      <FontAwesomeIcon icon={faEnvelope} {...iconExtraAttrs} class="h-5 -mr-8 z-10" />
      <input
        class=" w-80 sm:w-[400px] border-2 rounded-[3px] text-dark border-light h-10 pl-10 pt-[2.5px]"
        placeholder="Email"
        type="text"
      />
    </div>
    <DefaultButton
      text="submit"
      click={() => SubmitEvent}
      class="mt-4 md:mt-0 -ml-[10px] md:-ml-[128px] xl:-ml-[152px]"
    />
  </div>
</form>
