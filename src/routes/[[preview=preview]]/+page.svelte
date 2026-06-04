<script lang="ts">
  import ScreenWidthImage from "$lib/components/ScreenWidth/ScreenWidthImage.svelte";
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import DefaultButton from "$lib/components/Buttons/DefaultButton.svelte";
  import thumb from "$lib/assets/images/thumb.jpg?as=run";
</script>

<ScreenWidthImage vimeoId="1031277602" src={thumb}>
  <div
    class="h-full w-full flex flex-col justify-center items-center gap-5 max-w-screen-lg text-center"
  >
    <h2>
      A diversified commercial real estate firm with deep roots in San Antonio, Texas & beyond
    </h2>
  </div>
</ScreenWidthImage>

<footer class="w-screen">
  <ContentWidth
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 h-24 py-2 md:py-10 relative"
  >
    <div class="flex flex-col gap-6 justify-end items-start md:h-24 relative pb-6">
      <div class="label">
        1160 E. Commerce Street, Suite 200 <br /> San Antonio, TX 78205 <br />
        210.905.0500
      </div>
    </div>
    <div class="flex flex-col gap-6 items-end justify-end md:h-24 pb-6">
      <div class="label">{"Copyright All Rights Reserved © " + new Date().getFullYear()}</div>
    </div>
  </ContentWidth>
</footer>
