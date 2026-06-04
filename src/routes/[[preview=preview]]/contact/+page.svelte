<script lang="ts">
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import ContactForm from "$lib/components/FullWidth/ContactForm.svelte";
  import espadaLogo from "$lib/assets/icons/logos/espadaLogo.svg";
</script>

<section class="w-full bg-white py-20 text-black">
  <ContentWidth class="border-t-2 border-black flex flex-col md:flex-row py-12">
    <h1 class="md:w-1/2 md:pr-8" style="text-shadow:none">Contact Us</h1>
    <div class="md:w-1/2 mt-12 md:mt-0">
      <ContactForm />
    </div>
  </ContentWidth>
</section>
<footer class="w-screen">
  <ContentWidth
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 h-48 py-10"
  >
    <div class="flex flex-col gap-6 justify-between items-start h-full relative">
      <a href="/" class="bump">
        <img src={espadaLogo} class="h-12" alt="logo" />
      </a>
      <div class="label">
        1160 E. Commerce Street, Suite 200 <br /> San Antonio, TX 78205 <br />
        210.905.0500
      </div>
    </div>
    <div class="flex flex-col gap-6 items-end justify-end h-48 pb-6">
      <div class="label">Copyright All Rights Reserved ©</div>
    </div>
  </ContentWidth>
</footer>
