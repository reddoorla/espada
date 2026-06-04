<script lang="ts">
  import stripMall from "$lib/assets/images/login/stripMall.jpg";
  import SubHero from "$lib/components/SubHero.svelte";
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<SubHero src={stripMall} text="Espada Investor Portfolio" />

<section class="w-full py-20 text-white">
  <ContentWidth class="border-t-2 border-white flex flex-col py-12">
    <h3 class="md:w-1/2 md:pr-8">
      Investors may login to the investor portal or contact us for login credentials.
    </h3>
    <div class="flex flex-col md:flex-row items-center gap-4 md:gap-10 mt-8 md:mt-16">
      <a
        class="nav-link transition hover:text-black hover:bg-white py-4 px-5 border-white border rounded-xs w-fit mt-8"
        target="_blank"
        href="https://espadarealestate.appfolio.com/oportal/users/log_in">Investor Login</a
      >
      <a
        class="nav-link transition hover:text-black hover:bg-white py-4 px-5 border-white border rounded-xs w-fit mt-8"
        href="/contact">Contact Us</a
      >
      <a
        class="nav-link transition hover:text-black hover:bg-white py-4 px-5 border-white border rounded-xs w-fit mt-8"
        href="/">Help Center</a
      >
    </div>
  </ContentWidth>
</section>
<Footer />
