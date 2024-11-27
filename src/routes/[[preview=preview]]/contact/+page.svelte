<script lang='ts'>
    import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import ContactForm from "$lib/components/FullWidth/ContactForm.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>


<section class="w-full bg-white py-20 text-black">
    <ContentWidth class="border-t-2 border-black flex flex-col md:flex-row py-12">
      <h1 class="md:w-1/2 md:pr-8" style="text-shadow:none">Contact Us</h1>
      <div class="md:w-1/2 mt-12 md:mt-0">
        <ContactForm />
      </div>
    </ContentWidth>
</section>
<Footer />
