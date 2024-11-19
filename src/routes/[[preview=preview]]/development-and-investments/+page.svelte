<script lang='ts'>
   import petco from "$lib/assets/images/property-management/petco.jpg"
    import conns from "$lib/assets/images/property-management/conns.jpg"
    import zoes from "$lib/assets/images/property-management/zoes.jpg"
    import starbucks from "$lib/assets/images/development-and-investments/starbucks.jpg"
    import corner from "$lib/assets/images/development-and-investments/corner.jpg"
    import mcAlister from "$lib/assets/images/development-and-investments/mcAlister.jpg"
    import dollarStore from "$lib/assets/images/development-and-investments/dollarTree.jpg"
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import FourByThreeImage from "$lib/components/FullWidth/FourByThreeImage.svelte";
    import bass from "$lib/assets/images/development-and-investments/bassProShops.jpg"
  import SubHero from "$lib/components/SubHero.svelte";
</script>

<SubHero src={bass} text="Development & Investments" />

<section class="w-full bg-white py-20">
  <ContentWidth class="flex flex-col gap-20 items-center pb-12">
    <h3 class="text-black max-w-2xl text-center">
      A diversified commercial real estate company with services development and investments with deep roots in San Antonio & South Texas.
    </h3>
    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="md:w-[calc(50%-24px)]">
      <FourByThreeImage src={starbucks}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Company</h5>
        <p>Espada Real Estate, formerly REATA Assets, Investments & Development, works to develop and invest in retail, office, medical office, industrial and storage assets primarily in San Antonio,  Texas, Oklahoma, Kansas and Illinois.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="md:w-[calc(50%-24px)]">
      <FourByThreeImage src={corner}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Services</h5>
        <p>We have mastered the artful orchestration of several disciplines — from design to disposition — in order to deliver each project on time and within budget while meeting or exceeding performance objectives. </p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="md:w-[calc(50%-24px)]">
      <FourByThreeImage src={mcAlister}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Network</h5>
        <p>Our extensive knowledge of many markets is just the beginning. We’ve spent years forging relationships with the people and organizations necessary for each project’s success.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="md:w-[calc(50%-24px)]">
      <FourByThreeImage src={dollarStore}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Reach</h5>
        <p>Based in San Antonio, our reach has grown to include multiple Texas markets as well as select opportunities outside of Texas.</p>
      </div>
    </div>

  </ContentWidth>
  <ContentWidth class="border-t-2 border-black">
    <h2 class="text-black md:max-w-2xl my-16">We are adept at executing every phase of development.</h2>
    <div class="w-full flex flex-row mb-32">
      <p class="md:w-1/2 text-black leading-loose">
        Market Research <br/>
        Site Selection<br/>
        Assemblage & Acquisition<br/>
        Project Design & Efficiency<br/>
        Land Entitlement<br/>
        Public Agency Coordination<br/>
        Pro Forma Analysis<br/>
        Consultant Team Selection<br/>
        Financing & Capital Structure
      </p>
      <p class="md:w-1/2 text-black leading-loose">
        Project Management<br/>
        Construction Management<br/>
        Asset Management<br/>
        Accounting<br/>
        Project Leasing & Land Sales<br/>
        Property Management<br/>
        Asset Disposition<br/>
        Fee Development
      </p>
    </div>
  </ContentWidth>
  <ContentWidth class="border-t-2 border-black">
    <h2 class="text-black my-16">Our Projects</h2>
  </ContentWidth>
</section>