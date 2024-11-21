<script lang='ts'>
	import placeholder from "../../assets/images/background_placeholder.svg";
	import ContentWidth from "../ContentWidth/ContentWidth.svelte";
	
	export let src = placeholder;
	export let altText = "background image";
	export let placeholderSide = "right";
	export let vimeoId = "";
	export let darken = false;
	export let backdrop = false;
	let viewportHeight: number;
	let viewportWidth: number;
	
	// Helper to check if URL already has image tool parameters
	function hasImageToolParams(url: string): boolean {
	  return url.includes('?w=') || url.includes('?format=') || url.includes('?quality=');
	}
	
	// Process the src to add image optimization if needed
	$: processedSrc = src === placeholder || hasImageToolParams(src)
	  ? src
	  : `${src}?w=1024;1536;1920;2560&format=webp&quality=80`;
	
	// Generate srcset for processed images
	$: srcset = src !== placeholder && !hasImageToolParams(src)
	  ? [1024, 1536, 1920, 2560]
		  .map(w => `${src}?w=${w}&format=webp&quality=80 ${w}w`)
		  .join(', ')
	  : '';
	
	// Determine if image should fill viewport based on aspect ratio
	$: fillHeight = viewportHeight * 16 > viewportWidth * 9;
	</script>
	
	<style>
	.bg-darken-gradient {
	  background: linear-gradient(180deg, rgba(203, 195, 164, 0.20) 33.5%, #656F5C15 100%);
	  background-blend-mode: multiply;
	}
	</style>
	
	<svelte:window bind:innerHeight={viewportHeight} bind:innerWidth={viewportWidth} />
	
	<section class="h-screen w-screen overflow-clip {backdrop ? "fixed -z-10 top-0 left-0" : "relative"}">
	  <div class="right-0 left-0 overflow-clip max-h-screen aspect-video relative {fillHeight ? 'h-screen min-w-full' : 'w-screen min-h-full'}">
		<img 
		  src={processedSrc} 
		  {srcset}
		  sizes={src === placeholder ? "(min-width: 1024px) 45vw, 100vw" : "100vw"}
		  alt={altText} 
		  class="absolute bottom-0 {placeholderSide}-0 h-full w-full object-cover {src === placeholder ? "lg:w-[45%] md:h-auto" : ""} -z-10"
		  loading={backdrop ? "eager" : "lazy"}
		  fetchpriority={backdrop ? "high" : "auto"}
		/>
		{#if vimeoId}
		  <iframe
			title="background video"
			src={`https://player.vimeo.com/video/${vimeoId}?background=1&muted=1&loop=1&autoplay=1`}
			class="aspect-video absolute {fillHeight ? 'h-screen min-w-full' : 'w-screen min-h-full'} contrast-[1.15] -z-10"
			frameborder="0"
			allowfullscreen
		  ></iframe>
		{/if}
		{#if darken}
		  <div class="bg-darken-gradient pointer-events-none absolute w-full h-full top-0 left-0 -z-10" />
		{/if}
		<div class="w-screen h-screen absolute top-0 left-0">
		  <ContentWidth class='{$$props.class || "flex items-center justify-center"} h-full'>
			<slot />
		  </ContentWidth>
		</div>
	  </div>
	</section>