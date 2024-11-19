<script lang="ts">
    export let src:string;
    export let text:string;
</script>


<div class="w-screen h-48 md:h-[60vh] relative overflow-hidden flex items-center justify-center">
    <img {src} alt="hero background" class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
    <div class="absolute w-full h-full bg-black opacity-30" ></div>
    <h1 class="z-10 max-w-2xl text-center">{text}</h1>
</div> 