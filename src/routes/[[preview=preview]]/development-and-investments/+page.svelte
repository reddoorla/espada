<script lang='ts'>

    import starbucks from "$lib/assets/images/development-and-investments/starbucks.jpg?as=run"
    import corner from "$lib/assets/images/development-and-investments/corner.jpg?as=run"
    import mcAlister from "$lib/assets/images/development-and-investments/mcAlister.jpg?as=run"
    import dollarStore from "$lib/assets/images/development-and-investments/dollarTree.jpg?as=run"
    import att from "$lib/assets/images/development-and-investments/att.jpg?as=run"
    import caboBobs from "$lib/assets/images/development-and-investments/caboBobs.jpg?as=run"
    import tJs from "$lib/assets/images/development-and-investments/tJs.jpg?as=run"
    import dominionSprings from "$lib/assets/images/development-and-investments/dominionSprings.jpg?as=run"
    import laredoDollarTree from "$lib/assets/images/development-and-investments/laredoDollarTree.jpg?as=run"
    import starbucks2 from "$lib/assets/images/development-and-investments/starbucks2.jpg?as=run"
  import ContentWidth from "$lib/components/ContentWidth/ContentWidth.svelte";
  import FourByThreeImage from "$lib/components/FullWidth/FourByThreeImage.svelte";
    import bass from "$lib/assets/images/development-and-investments/bassProShops.jpg?as=run"
    import beitel from  "$lib/assets/images/development-and-investments/PerrinBeitel.jpg?as=run"
    import brookhill from  "$lib/assets/images/development-and-investments/Brookhill.jpg?as=run"
    import braunfels from  "$lib/assets/images/development-and-investments/NewBraunfels.jpg?as=run"
  import SubHero from "$lib/components/SubHero.svelte";
  import { slide } from "svelte/transition";
  import Footer from "$lib/components/Footer.svelte"


  const projectArray = [
    {
      image: att,
      name: "AT&T Uvalde",
      address1:"3190 East Uvalde Street",
      address2:"Uvalde, TX",
      desc:"4,515SF single-tenant build-to-suit",
      status:"Asset stabilized and sold",
      timeline:[
        "Negotiated JV with land partner May 2014",
        "LOI with AT&T June 2014 with a March 2015 lease effective date",
        "September 2015 construction started; January 2016 construction completed/tenant delivery; March 2016 rent commenced",
        "Sold"
      ]
    },
    {
      image: laredoDollarTree,
      name: "Laredo Dollar Tree Shopping Center",
      address1:"3502 Clark Blvd",
      address2:"Laredo, TX",
      desc:"Developed Dollar Tree Anchored 22,000 sf retail center",
      status:"Owned in portfolio",
    },
    {
      image: beitel,
      name: "Perrin Beitel Shopping Center",
      address1:"8611 Perrin Beitel Road",
      address2:"San Antonio, TX",
      desc:"Re-Developed 65,000sf retail center",
      status:"Owned in portfolio",
    },
    {
      image: dominionSprings,
      name: "Dominion Springs Plaza",
      address1:"IH 10 West & Boerne Stage Rd",
      address2:"San Antonio, TX",
      desc:"Developed 65,000 sf retail center",
      status:"Fee Developed",
    },
    {
      image: tJs,
      name: "Sonterra Village",
      address1:"NWC Loop 1604 & Sonterra Place",
      address2:"San Antonio, TX",
      desc:"Developed Trader Joe's Anchored 43,000 sf retail center",
      status:"Asset stabilized and sold",
    },
    {
      image: starbucks2,
      name: "Live Oak Civic Center",
      address1:"Loop 1604 & Pat Booker Road",
      address2:"San Antonio, TX",
      desc:"Redevelopment of Civic Center/Starbucks Build-to-Suit",
      status:"Asset stabilized and sold",
    },
    {
      image: caboBobs,
      name: "Cabo Bob's Redevelopment",
      address1:"847 NE Loop 410",
      address2:"San Antonio, TX",
      desc:"Redevelopment & Re-Tenanting of existing building",
      status:"Asset stabilized and sold",
    },
    {
      image: braunfels,
      name: "River Mill Redevelopment",
      address1:"555 Porter Street",
      address2:"New Braunfels, TX",
      desc:"Redevelopment of  12 acre industrial mill",
      status:"Obtained entitlements & sold",
    },
    {
      image: brookhill,
      name: "Brookhill Shopping Center",
      address1:"NWC of Pecan Valley Dr & Goliad Road",
      address2:"San Antonio, TX",
      desc:"Added value through renovation and leasing",
      status:"Asset stabilized and sold",
    },

  ]

  let projectStates = $state(Array(projectArray.length).fill(false));

</script>

<SubHero src={bass} text="Development & Investments" />

<section class="w-full bg-white py-20">
  <ContentWidth class="flex flex-col gap-20 items-center pb-12">
    <h3 class="text-black max-w-2xl text-center">
      A diversified commercial real estate firm with deep roots in San Antonio, Texas & beyond
    </h3>
    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={starbucks}/>

      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Company</h5>
        <p>Espada Real Estate, formerly REATA Assets, Investments & Development, works to develop and invest in retail, office, medical office, industrial and storage assets primarily in San Antonio,  Texas, Oklahoma, Kansas and Illinois.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={corner}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Services</h5>
        <p>We have mastered the artful orchestration of several disciplines — from design to disposition — in order to deliver each project on time and within budget while meeting or exceeding performance objectives. </p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
      <FourByThreeImage src={mcAlister}/>
      </div>
      <div class="md:w-[calc(50%-24px)] border-t-2 border-t-black py-6 gap-6 flex flex-col text-black">
        <h5>Our Network</h5>
        <p>Our extensive knowledge of many markets is just the beginning. We’ve spent years forging relationships with the people and organizations necessary for each project’s success.</p>
      </div>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start gap-12">
      <div  class="w-full md:w-[calc(50%-24px)]">
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
    <h2 class="text-black my-16">Our Projects</h2>å
    <div class="flex flex-row justify-center flex-wrap gap-x-12 gap-y-20 text-black">
      {#each projectArray as proj, i}
      <div class="w-full md:w-[calc(50%-24px)]">
        <FourByThreeImage src={proj.image} alt={proj.name}/>
        <div class="mt-12 border-t-2 border-black w-full">
          <button class="w-full flex flex-row justify-between items-center h-20" onclick={()=>projectStates[i]=!projectStates[i]}>
            <h5>{proj.name}</h5>
            <i class="fa-sharp fa-chevron-down fa-lg transition-transform {projectStates[i]?"-rotate-180":""}"></i>
          </button>
          {#if projectStates[i]}
          <div class="w-full flex flex-col gap-5" transition:slide>
            <div>
              <p class="font-medium">Location</p>
              <p>{proj.address1}</p>
              <p>{proj.address2}</p>
            </div>
            <div>
              <p class="font-medium">Project Description</p>
              <p>{proj.desc}</p>
            </div>
            <div>
              <p class="font-medium">Project Status</p>
              <p>{proj.status}</p>
            </div>
            <div>
              {#if proj.timeline}
              <p class="font-medium">Timeline</p>
              <ul class="list-disc translate-x-5 pr-5">
              {#each proj.timeline as item}
                <li>
                  <p>
                    {item}
                  </p>
                </li>
              {/each}
              </ul>
              {/if}
            </div>
          </div>
          {/if}

        </div>
      </div>
      {/each}
    </div>
  </ContentWidth>
</section>
<Footer />