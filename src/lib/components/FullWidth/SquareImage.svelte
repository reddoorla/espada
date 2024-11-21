<script lang="ts">
    import placeholder from "$lib/assets/images/image_placeholder.svg"
    export let src = placeholder;
    export let alt = "placeholder"
    const rotationAngle = "45";
    const crossLength = "141%";
    
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
    </script>
    
    <div class="w-full {$$props.class || ''}">
    <div class="w-full aspect-square {processedSrc===placeholder ? "border-light border-2 bg-light bg-opacity-25":""} rounded-sm flex items-center justify-center relative">
    <img 
      src={processedSrc} 
      {alt} 
      {srcset}
      sizes="(min-width: 1024px) 1024px, 100vw"
      class="z-10 object-cover {processedSrc==placeholder ? "w-16 bg-[#F2F5F7]" : "w-full h-full"}"
      loading="lazy"
      decoding="async"
    />
    <div class="absolute bg-light h-[2px] {processedSrc===placeholder ? "":"hidden"}" style="transform: rotate({rotationAngle}deg); width:{crossLength}"></div>
    <div class="absolute bg-light h-[2px] {processedSrc===placeholder ? "":"hidden"}" style="transform: rotate(-{rotationAngle}deg); width:{crossLength}"></div>
    </div>
    </div>