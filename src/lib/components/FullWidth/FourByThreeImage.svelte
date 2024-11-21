<script lang="ts">
    import placeholder from "$lib/assets/images/image_placeholder.svg";
    
    export let src = placeholder;
    export let alt = "placeholder";
    export let label = "";
    let rotationAngle = "36.8";
    let crossLength = "125%";
    
    // Helper to check if URL already has image tool parameters
    function hasImageToolParams(url: string): boolean {
      return url.includes('?w=') || url.includes('?format=') || url.includes('?quality=');
    }
    
    // Process the src to add image optimization if needed
    $: processedSrc = src === placeholder || hasImageToolParams(src) 
      ? src 
      : `${src}?w=400;800;1200&format=webp&quality=80`;
    
    // Generate srcset for processed images
    $: srcset = processedSrc !== placeholder && !hasImageToolParams(src)
      ? [400, 800, 1200]
          .map(w => `${src}?w=${w}&format=webp&quality=80 ${w}w`)
          .join(', ')
      : '';
    
    // Calculate sizes attribute based on container width
    const sizes = "(min-width: 1024px) 1024px, 100vw";
    </script>
    
    <div class="w-full relative {$$props.class || ''}">
      <div class="w-full aspect-[4/3] {processedSrc===placeholder ? "border-light border-2 bg-light bg-opacity-25":""} rounded-sm flex items-center justify-center relative">
        {#if processedSrc === placeholder}
          <img 
            src={processedSrc} 
            {alt} 
            class="z-10 object-cover w-16 bg-[#F2F5F7]"
          />
          <div class="absolute bg-light h-[2px]" style="transform: rotate({rotationAngle}deg); width:{crossLength}"></div>
          <div class="absolute bg-light h-[2px]" style="transform: rotate(-{rotationAngle}deg); width:{crossLength}"></div>
        {:else}
          <img 
            src={processedSrc}
            {srcset}
            {sizes}
            {alt} 
            class="z-10 object-cover w-full h-full"
            loading="lazy"
            decoding="async"
          />
        {/if}
        <h6 class="absolute bottom-4 z-20">{label}</h6>
      </div>
    </div>
 