<script lang='ts'>
  import stPaul from "$lib/assets/images/about/stPaul.jpg"
  import SubHero from "$lib/components/SubHero.svelte";
  import ContentWidth from  "$lib/components/ContentWidth/ContentWidth.svelte"
  import SquareImage from "$lib/components/FullWidth/SquareImage.svelte";
  import { slide } from "svelte/transition";

  import brent from "$lib/assets/images/about/headshots/brent.jpeg"

  const leaderArray = [
      {
          headshot: brent,
          name: "Brent Conlin",
          title: "Managing Partner",
          body: `Brent is a commercial real estate developer and private equity investor with 30+ years in professional real estate experience predominantly in San Antonio and South Texas. \n \n As a Managing Partner of Espada, he oversees development and investment activities. He has served as Managing Partner of Espada Real Estate (formerly Reata Assets, Investments & Development) since its inception in 2012, after more than a decade of corporate real estate experience at the Trammell Crow Company. Brent has a BBA and a MS in Land & Real Estate Development from Texas A&M University. He serves on the ULI San Antonio Advisory Council and is a member of the San Antonio Real Estate Council and ICSC. Brent is a Co-Captain of the Valero Texas Open Trailblazers and an Executive Committee Member of the Development Industry Advisory Council for the Texas A&M graduate program in land & property development.`,
          vcfLink:'contact-cards/BrentConlin.vcf',
      }
  ]
  let leaderBioStates = $state(Array(leaderArray.length).fill(false));
  let viewportWidth = $state(0);
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<SubHero src={stPaul} text="About Espada" />

<section class="w-full bg-white py-20 text-black">
  <ContentWidth class="border-t-2 border-black flex flex-col md:flex-row py-12">
    <h3 class="md:w-1/2 md:pr-8">Espada Real Estate is a diversified commercial real estate company with deep roots in San Antonio and south Texas.</h3>
    <p class="mt-12 md:mt-0 md:w-1/2 md:pl-8 whitespace-pre-line leading-loose">
      Espada Real Estate evolved from Reata Assets Investment and Development (RAID) after the sale of the Reata companies to CBRE in 2019.  The founders of RAID, now Espada, collectively have 140 years of experience in the retail real estate industry and have worked with former companies such as Trammell Crow, CBRE, and United Commercial Realty. 

In more recent years, Espada partners and their associates have developed and acquired other notable projects including Sonterra Village, Dominion Springs Plaza, St. Paul Square, Brooks Corner, Memorial Crossing, Baytowne Shopping Center and Rio Norte shopping center.  The name Espada, Spanish for “sword”, speaks to the company’s partners’ long history in San Antonio. The name pays tribute to Mission Espada, the oldest Spanish mission in Texas and one of the five missions in San Antonio that were recently designated as a World Heritage Site.
    </p>
  </ContentWidth>
  <ContentWidth class="border-t-2 border-black flex flex-col gap-20 py-12">
      <h2>Espada Leadership</h2>

      {#each leaderArray as p, i}
      <div class="xl:min-h-80 flex flex-col xl:flex-row justify-between w-full flex-nowrap">
          <div class="flex flex-col sm:flex-row xl:w-1/2">
              <div class="sm:w-1/2 flex flex-col items-start">
                  <SquareImage src={p.headshot} />
              </div>
              <div class="sm:w-1/2 flex flex-col mt-8 sm:mt-0 sm:pl-8 gap-2">
                  <h5>{p.name}</h5>
                  <h6>{p.title}</h6>
                  <a class="nav-link transition hover:text-white hover:bg-black text-black py-4 px-5 border-black border-2 rounded-sm w-fit mt-8" href={p.vcfLink} download>Contact Card</a>
                  {#if viewportWidth < 1340}
                  <button 
                      onclick={() => leaderBioStates[i] = !leaderBioStates[i]} 
                      class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-2 rounded-sm w-fit mt-2"
                  >
                      {leaderBioStates[i] ? "Hide Bio" : "Show Bio"}
                  </button>
                  {/if}
              </div>
          </div>
          <p class="hidden xl:block xl:mt-0 xl:w-1/2 whitespace-pre-line">{p.body}</p>
          {#if leaderBioStates[i]&&viewportWidth<1340}
              <div transition:slide>
                  <p class="mt-8 whitespace-pre-line">{p.body}</p>
                  <button 
                      onclick={() => leaderBioStates[i] = !leaderBioStates[i]} 
                      class="mt-6 nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-2 rounded-sm w-fit"
                  >
                      {leaderBioStates[i] ? "Hide Bio" : "Show Bio"}
                  </button>
              </div>
          {/if}
      </div>
      {/each}
  </ContentWidth>
</section>