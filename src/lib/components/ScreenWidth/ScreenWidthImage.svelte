<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang='ts'>
	import placeholder from "../../assets/images/background_placeholder.svg";
	import ContentWidth from "../ContentWidth/ContentWidth.svelte";
	
	export let src = placeholder;
	export let altText = "background image"
	export let placeholderSide = "right"
	export let vimeoId = ""
	export let darken = false;
	export let backdrop = false;
	
	let viewportHeight:number;
	let viewportWidth:number;
	
	</script>

	<style>
		.bg-darken-gradient{
			background: linear-gradient(180deg, rgba(203, 195, 164, 0.20) 33.5%, #656F5C15 100%);
			background-blend-mode: multiply;
		}
	</style>
	
	<svelte:window bind:innerHeight={viewportHeight} bind:innerWidth={viewportWidth} />
	
	<section class="h-screen w-screen overflow-clip {backdrop?"fixed -z-10 top-0 left-0":"relative"}">
		<div class="right-0 left-0 overflow-clip max-h-screen aspect-video relative {viewportHeight * 16 > viewportWidth * 9 ? 'h-screen min-w-full' : 'w-screen min-h-full'}">
			
				<img src={src} alt={altText} class="absolute bottom-0 {placeholderSide}-0 h-full w-full object-cover {src===placeholder ? "lg:w-[45%] md:h-auto" : ""} -z-10"/>
			
			{#if vimeoId}
				
					<iframe 
					title="background video" 
					src={`https://player.vimeo.com/video/${vimeoId}?background=1&muted=1&loop=1&autoplay=1`}
					class="aspect-video absolute {viewportHeight * 16 > viewportWidth * 9 ? 'h-screen min-w-full' : 'w-screen min-h-full'} contrast-[1.15] -z-10"
					frameborder="0"
					allowfullscreen
					
					
				  ></iframe>
			{/if}
			
			{#if darken}
			<div class="bg-darken-gradient pointer-events-none absolute w-full h-full top-0 left-0 -z-10" />
			{/if}
			<div class="w-screen h-screen absolute top-0 left-0">
			<ContentWidth class='{$$props.class || 'flex items-center justify-center'} h-full'>
				<slot />
			</ContentWidth>
			</div>
		</div>
	</section>