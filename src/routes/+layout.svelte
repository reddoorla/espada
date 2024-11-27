<script lang='ts'>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import "../app.css";
  import ContentWidth from '$lib/components/ContentWidth/ContentWidth.svelte';
  import espadaLogo from '$lib/assets/icons/logos/espadaLogo.svg'
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';
  import Footer from '$lib/components/Footer.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props()
	
	const NAV_LINKS=[
        {
            label:"Property Management",
            href:"/property-management"
        },
        {
            label:"Development & Investments",
            href:"/development-and-investments"
        },
        {
            label:"About",
            href:"/about"
        },
        {
            label:"Contact",
            href:"/contact"
        },
        {
            label:"Investor Login",
            href:"/login"
        },

    ];



    let isOverlayVisible = $state(false);
	let isTransitioning = $state(true);

	onMount(()=>{
		
		setTimeout(()=>{
			isTransitioning = false;
		}, 1200)
		
	})

	onNavigate(()=>{
		isTransitioning = true;

		setTimeout(()=>{
			isTransitioning = false;
		}, 600)
	})

</script>

<svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image.url} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	<meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no">
</svelte:head>

{#if isTransitioning}
	<div class="bg-[#140F09] z-40 fixed w-screen h-screen top-0 left-0 pointer-events-none" out:fade={{duration:700}} ></div>
{/if}

{#if isOverlayVisible}
<div class="w-screen h-screen fixed bg-black flex flex-col items-center justify-center gap-12 z-30" transition:fly={{y:"-100%"}}>
    {#each NAV_LINKS as item}
        <a onclick={()=>isOverlayVisible=false} href={item.href} class="text-white text-2x nav-links hover:opacity-100 opacity-75">{item.label}</a>
    {/each}

    <button class="absolute top-5 right-5 opacity-60 hover:opacity-100 transition-all z-40" onclick={()=>isOverlayVisible=false} aria-label="close overlay">
        <div in:fade={{delay: 600}} out:fade class="text-white">
        	<i class="fa-sharp fa-thin fa-close fa-3x"></i>
        </div>
      
    </button>
</div>
{/if}
<main>
	<div class="h-16 w-screen">
		<ContentWidth class="flex flex-row justify-between items-center h-full">
	
			
			<a href="/" class="hover:opacity-80 transition-all duration-500 bump">
				<img src={espadaLogo} alt="logo" class="h-10"/>
			</a>
			<div class="flex flex-row">
				<div class="hidden lg:flex flex-row justify-between items-center gap-10">
					{#each NAV_LINKS as item}
						<a class="nav-link hover:opacity-100 opacity-75" href={item.href}>{item.label}</a>
					{/each}
				</div>
			
				<button class="lg:hidden ml-6 opacity-60 hover:opacity-100 transition-all" onclick={()=>isOverlayVisible=true}>
				{#if !isOverlayVisible}
						<i class="fa-sharp fa-thin fa-bars fa-2xl text-white"></i>
					{/if}
				
				</button>
			 </div>
			
	
		</ContentWidth>
	</div>
	{@render children?.()}
</main>

<PrismicPreview {repositoryName} />
