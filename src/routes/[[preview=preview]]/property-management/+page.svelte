<script lang='ts'>
    import petco from "$lib/assets/images/property-management/petco.jpg?as=run"
    import conns from "$lib/assets/images/property-management/conns.jpg?as=run"
    import zoes from "$lib/assets/images/property-management/zoes.jpg?as=run"
    import ross from "$lib/assets/images/property-management/ross.jpg?as=run"
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import FourByThreeImage from "$lib/components/FullWidth/FourByThreeImage.svelte";
  import SubHero from "$lib/components/SubHero.svelte";
</script>

<SubHero src={ross} text="Property Management" />
<section class="w-full bg-white py-20">
  <ContentWidth class="flex flex-col gap-20">
    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={conns}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Experience and Expertise</h5>
        <p>Each member of our team has a solid background in property management and a deep knowledge of the market. We are prepared to address every phase of your project including tenant relations, physical inspections, accounting, annual budgets, advertising and negotiating with outside vendors. We have built strong service relationships necessary to ensure your project consistently appears its best. Espada is prepared to manage all tasks including any capital improvement projects necessary to enhance its value.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={zoes}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Strategy and Service</h5>
        <p>Espada Property Management will deliver innovative ideas and responsive solutions supported by expert analyses and clear, in-depth reporting. Our proven methodology applies client-specific accounting systems to reduce operating expenses and increase cash flow. Monthly or quarterly reports will be prepared allowing our clients to make the best decisions regarding the asset.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={petco}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Proven results</h5>
        <p>Our perspective as current project owners has given our team a very good understanding of how to manage your property. We have  built our reputation as a premier management team by maximizing the value of assets ranging from large power and neighborhood shopping centers to office buildings of every type and size.</p>
      </div>
    </div>

  </ContentWidth>
</section>