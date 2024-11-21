<script lang="ts">
    export let src: string;
    export let text: string;
    
    // Helper to check if URL already has image tool parameters
    function hasImageToolParams(url: string): boolean {
      return url.includes('?w=') || url.includes('?format=') || url.includes('?quality=');
    }
    
    // Process the src to add image optimization if needed
    $: processedSrc = hasImageToolParams(src) 
      ? src 
      : `${src}?w=800;1200;1600;2400&format=webp&quality=80`;
    
    // Generate srcset for processed images
    $: srcset = !hasImageToolParams(src)
      ? [800, 1200, 1600, 2400]
          .map(w => `${src}?w=${w}&format=webp&quality=80 ${w}w`)
          .join(', ')
      : '';
    </script>
    
    <div class="w-screen h-48 md:h-[60vh] relative overflow-hidden flex items-center justify-center">
      <img 
        src={processedSrc} 
        {srcset}
        sizes="100vw"
        alt="hero background" 
        class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute w-full h-full bg-black opacity-30"></div>
      <h1 class="z-10 max-w-2xl text-center">{text}</h1>
    </div>