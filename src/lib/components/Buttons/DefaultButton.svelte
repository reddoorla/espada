<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
    export let text = "BUTTON";
    export let click = ()=>{};
    export let filled = true;
    export let href="";
</script>

<style>
    button, a{
        display: inline-flex;
padding: 15px 20px;
justify-content: center;
align-items: center;
gap: 10px;
color: var(--White, #FFF);
text-align: center;
font-feature-settings: 'liga' off, 'clig' off;
font-family: Interstate;
font-size: 12px;
font-style: normal;
font-weight: 300;
line-height: normal;
text-transform: uppercase;
    }
  

</style>

{#if href}
    <a {href} on:click={click} 
            class="{filled ?
            "bg-white bg-opacity-0 hover:bg-opacity-5 active:bg-black  text-white" 
            : 
            "hover:bg-dark text-dark hover:text-white active:bg-black " 
            } border-2 border-white w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 label {$$props.class || ''}">
            <slot />
    </a>
{:else}
<button on:click={click} 
        class="{filled ?
         "bg-dark bg-opacity-80 hover:bg-opacity-100 active:bg-black  text-white" 
         : 
         "hover:bg-dark text-dark hover:text-white active:bg-black " 
         } border-2 border-dark w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 {$$props.class || ''}">
        <slot />
</button>
{/if}