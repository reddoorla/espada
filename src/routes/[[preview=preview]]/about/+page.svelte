<script lang='ts'>
  import stPaul from "$lib/assets/images/about/stPaul.jpg"
  import SubHero from "$lib/components/SubHero.svelte";
  import ContentWidth from  "$lib/components/ContentWidth/ContentWidth.svelte"
  import SquareImage from "$lib/components/FullWidth/SquareImage.svelte";
  import { slide } from "svelte/transition";

  import brent from "$lib/assets/images/about/headshots/brent.jpeg"

  import Don from "$lib/assets/images/about/headshots/Don.jpg"

  import Jessica from "$lib/assets/images/about/headshots/Jessica.jpg"
  import John from "$lib/assets/images/about/headshots/John.jpg"
  import Kaitlin from "$lib/assets/images/about/headshots/Kaitlin.jpg"
  import Kathy from "$lib/assets/images/about/headshots/Kathy.jpg"

  import Michael from "$lib/assets/images/about/headshots/Michael.jpg"
  import Mitch from "$lib/assets/images/about/headshots/Mitch.jpg"

  import Sophie from "$lib/assets/images/about/headshots/Sophie.jpg"
  import Thomas from "$lib/assets/images/about/headshots/Thomas.jpg"

  const leaderArray = [
      {
          headshot: brent,
          name: "Brent Conlin",
          title: "Managing Partner",
          body: `Brent is a commercial real estate developer and private equity investor with 30+ years in professional real estate experience predominantly in San Antonio and South Texas. \n \n As a Managing Partner of Espada, he oversees development and investment activities. He has served as Managing Partner of Espada Real Estate (formerly Reata Assets, Investments & Development) since its inception in 2012, after more than a decade of corporate real estate experience at the Trammell Crow Company. Brent has a BBA and a MS in Land & Real Estate Development from Texas A&M University. He serves on the ULI San Antonio Advisory Council and is a member of the San Antonio Real Estate Council and ICSC. Brent is a Co-Captain of the Valero Texas Open Trailblazers and an Executive Committee Member of the Development Industry Advisory Council for the Texas A&M graduate program in land & property development.`,
          vcfLink:'contact-cards/BrentConlin.vcf',
      },
      {
          headshot: Don,
          name: "Don Thomas",
          title: "Partner",
          body: `Don is a commercial real estate broker, developer, manager and equity investor in properties, restaurants and other operating businesses. \n \n Prior to co-founding Espada Real Estate and joining CBRE in 2019, Don co-founded Reata Real Estate Services in 2001. Prior to Reata, Don was a Partner/ Principal for The Trammell Crow Company for thirteen years. Don’s responsibilities include leasing, property management, development, acquisition and disposition. Don’s commercial real estate activity spans San Antonio, Austin, Dallas/ Fort Worth and Tulsa, OK. Don earned a BBA from Texas Christian University and currently serves on multiple nonprofit boards.`,
          vcfLink:'contact-cards/DonThomas.vcf',
      },
      {
          headshot: John,
          name: "John Wright",
          title: "Partner",
          body: `John is a commercial real estate developer, and investor.  \n \n After nearly 10 years as a commercial broker focused on the representation of retail tenants and landlords at Trammell Crow Company and CBRE, John joined Reata Real Estate’s development and investment team where he was responsible for identifying opportunities, sourcing debt and equity and overseeing the execution of projects.  At Espada, John is focused on building a portfolio of real estate assets that produce superior risk- adjusted returns. John has a BA from Wake Forest University and an MBA from The Owen Graduate School of Management at Vanderbilt University.`,
          vcfLink:'contact-cards/JohnWrightIV.vcf',
      },
      {
          headshot: Michael,
          name: "Michael Jersin",
          title: "Partner",
          body: `Micheal is a commercial real estate developer, investor, broker, and equity investor in operating real estate projects and businesses. \n \n Prior to joining CBRE, Michael held leadership roles as CEO at Reata Real Estate (acquired by CBRE) and President of United Commercial Realty – San Antonio. With 30 years of experience in the commercial real estate industry, Michael has led many successful real estate developments, redevelopments and repositioning of commercial assets. His current role with Espada Real Estate is the co- manager of the Espada owned assets and the pursuit of commercial real estate opportunities. At CBRE, Michael will continue to serve his clients in the greater San Antonio and suburbs of San Antonio market. Michael has a Bachelor of Business Administration from the University of Texas at San Antonio and a Master of Science from Trinity University.`,
          vcfLink:'contact-cards/MichaelJersin.vcf',
      },
      {
          headshot: Thomas,
          name: "Thomas Tyng",
          title: "Partner",
          body: `Thomas is a commercial real estate broker and investor with 30+ years of experience in tenant representation, project leasing and investment sales. \n \n Prior to co-founding Reata Real Estate Services in 2001, Thomas worked for three years at The Woodmont Companies in Fort Worth and for nine years at Trammell Crow Company in San Antonio. After the sale of Reata Real Estate Services to CBRE, Thomas and his Espada partners formed Espada Real Estate where his responsibilities include acquisitions, leasing oversight and assisting in asset management. At CBRE, Thomas will continue to serve clients in San Antonio, Austin, Laredo, Corpus Christi and the Rio Grande Valley. Thomas received his BBA from Texas Christian University.`,
          vcfLink:'contact-cards/ThomasTyng.vcf',
      },
  ]

  const developmentTeamArray = [
    {
          headshot: Mitch,
          name: "Mitch Nichols",
          title: "Director of Medical Office Development",
          body: `Mitch is a commercial real estate developer, investor, broker, and private equity investor. After 25 years in the medical device sales industry, he joined ESPADA in 2018. In his role as Director of Medical Development he is responsible for identifying, underwriting, financing and executing development and investment opportunities. Mitch has a Bachelor of Science Degree from Angelo State University. He is an active member in the Urban Land Institute of San Antonio and the Real Estate Council of San Antonio.`,
          vcfLink:'contact-cards/MitchNichols.vcf',
      },
  ]

  const propertyTeamArray = [
    {
          headshot: Jessica,
          name: "Jessica Lopez",
          title: "Director of Property Management",
          body: `Jessica is a Certified Property Manager with over 13 years of experience in property management.  She previously served as a General Manager at Big V Properties where she was responsible for The Rim, the largest shopping center in Texas.  During her time there, she held positions of increasing responsibility starting as Assistant Property Manager and ultimately becoming the General Manager.  Prior to Big V, she worked at the Rivercenter Mall Management Office for seven years.  She has served as a board member for IREM’s San Antonio chapter and is actively involved in IREM events.  Jessica is originally from Chicago, where she worked in lease administration for American Express before going on to become the Manager of Lease Administration for American Express at consulting firms such as Deloitte & Touche, American Express Tax and Business Services, and RSM McGladrey`,
      },
      {
          headshot: Kaitlin,
          name: "Kaitlin Davey",
          title: "Property Manager",
          body: `Kaitlin is the Property Manager St. Paul Square, Patriot Plaza, and Live Oak Shopping Center. She is currently managing a portfolio of about 1,000,000 square feet of Class A office and retail space. Prior to joining Espada Real Estate, Kaitlin worked in commercial property management for Spigel Properties where her portfolio was comprised of shopping centers with a strong concentration in Michigan, Ohio and Texas. Kaitlin is an active member of IREM San Antonio. Kaitlin earned her BA from Texas Tech University.`,
      },
      {
          headshot: Sophie,
          name: "Sophie Larking",
          title: "Assistant Property Manager",
          body: `Sophie is an Assistant Property Manager in the commercial real estate industry. Having attended the University of North Carolina, she brings a diverse background in property management, event coordination, and hospitality. Sophie has served as an artist in residence at Hotel Emma and managed events for Saint City Culinary, where she supported a foundation providing low-cost medical services to Texas service industry workers.
In her free time, Sophie volunteers with SNIPSA. Her varied experiences and dedication to both her work and community make her a valuable asset to property operations and tenant relations.`,
      },
      {
          headshot: Kathy,
          name: "Kathy Palmer",
          title: "Real Estate Controller",
          body: `Kathy has 25+ years of experience as a Chief Financial Officer and Accounting Manager, specializing in commercial real estate and property management, in San Antonio and South Texas.  Kathy has a BBA in Accounting from the University of Texas at Arlington. `,
      },
  ]



  let leaderBioStates = $state(Array(leaderArray.length).fill(false));
  let developmentTeamBioStates =  $state(Array(developmentTeamArray.length).fill(false));
  let propertyTeamBioStates =  $state(Array(propertyTeamArray.length).fill(false));
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
                  {#if p.vcfLink}
                    <a class="nav-link transition hover:text-white hover:bg-black text-black py-4 px-5 border-black border-[1px] rounded-sm w-fit mt-8" href={p.vcfLink} download>Contact Card</a>
                  {/if}
                  {#if viewportWidth < 1340}
                  <button 
                      onclick={() => leaderBioStates[i] = !leaderBioStates[i]} 
                      class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit mt-2"
                  >
                      {leaderBioStates[i] ? "Hide Bio" : "Show Bio"}
                  </button>
                  {/if}
              </div>
          </div>
          <p class="hidden xl:block xl:mt-0 xl:w-1/2 xl:pl-8 whitespace-pre-line">{p.body}</p>
          {#if leaderBioStates[i]&&viewportWidth<1340}
              <div transition:slide>
                  <p class="mt-8 whitespace-pre-line">{p.body}</p>
                  <button 
                      onclick={() => leaderBioStates[i] = !leaderBioStates[i]} 
                      class="mt-6 nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit"
                  >
                      {leaderBioStates[i] ? "Hide Bio" : "Show Bio"}
                  </button>
              </div>
          {/if}
      </div>
      {/each}
  </ContentWidth>

  <ContentWidth class="border-t-2 border-black flex flex-col gap-20 py-12">
    <h2>Development and Investment Team</h2>

    {#each developmentTeamArray as p, i}
    <div class="xl:min-h-80 flex flex-col xl:flex-row justify-between w-full flex-nowrap">
        <div class="flex flex-col sm:flex-row xl:w-1/2">
            <div class="sm:w-1/2 flex flex-col items-start">
                <SquareImage src={p.headshot} />
            </div>
            <div class="sm:w-1/2 flex flex-col mt-8 sm:mt-0 sm:pl-8 gap-2">
                <h5>{p.name}</h5>
                <h6>{p.title}</h6>
                {#if p.vcfLink}
                  <a class="nav-link transition hover:text-white hover:bg-black text-black py-4 px-5 border-black border-[1px] rounded-sm w-fit mt-8" href={p.vcfLink} download>Contact Card</a>
                {/if}
                {#if viewportWidth < 1340}
                <button 
                    onclick={() => developmentTeamBioStates[i] = !developmentTeamBioStates[i]} 
                    class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit mt-2"
                >
                    {developmentTeamBioStates[i] ? "Hide Bio" : "Show Bio"}
                </button>
                {/if}
            </div>
        </div>
        <p class="hidden xl:block xl:mt-0 xl:w-1/2 xl:pl-8 whitespace-pre-line">{p.body}</p>
        {#if developmentTeamBioStates[i]&&viewportWidth<1340}
            <div transition:slide>
                <p class="mt-8 whitespace-pre-line">{p.body}</p>
                <button 
                    onclick={() => developmentTeamBioStates[i] = !developmentTeamBioStates[i]} 
                    class="mt-6 nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit"
                >
                    {developmentTeamBioStates[i] ? "Hide Bio" : "Show Bio"}
                </button>
            </div>
        {/if}
    </div>
    {/each}
</ContentWidth>
<ContentWidth class="border-t-2 border-black flex flex-col gap-20 py-12">
    <h2>Property Management Team</h2>

    {#each propertyTeamArray as p, i}
    <div class="xl:min-h-80 flex flex-col xl:flex-row justify-between w-full flex-nowrap">
        <div class="flex flex-col sm:flex-row xl:w-1/2">
            <div class="sm:w-1/2 flex flex-col items-start">
                <SquareImage src={p.headshot} />
            </div>
            <div class="sm:w-1/2 flex flex-col mt-8 sm:mt-0 sm:pl-8 gap-2">
                <h5>{p.name}</h5>
                <h6>{p.title}</h6>
                {#if viewportWidth < 1340}
                <button 
                    onclick={() => propertyTeamBioStates[i] = !propertyTeamBioStates[i]} 
                    class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit mt-2"
                >
                    {propertyTeamBioStates[i] ? "Hide Bio" : "Show Bio"}
                </button>
                {/if}
            </div>
        </div>
        <p class="hidden xl:block xl:mt-0 xl:w-1/2 xl:pl-8 whitespace-pre-line">{p.body}</p>
        {#if propertyTeamBioStates[i]&&viewportWidth<1340}
            <div transition:slide>
                <p class="mt-8 whitespace-pre-line">{p.body}</p>
                <button 
                    onclick={() => propertyTeamBioStates[i] = !propertyTeamBioStates[i]} 
                    class="mt-6 nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border-[1px] rounded-sm w-fit"
                >
                    {propertyTeamBioStates[i] ? "Hide Bio" : "Show Bio"}
                </button>
            </div>
        {/if}
    </div>
    {/each}
</ContentWidth>
</section>