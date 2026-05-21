<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">


  let { text = "BUTTON", click = ()=>{}, filled = true, href = "" }: { text?: unknown; click?: unknown; filled?: unknown; href?: unknown } = $props();
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
    <a {href} onclick={click} 
            class="{filled ?
            "hover:bg-white   hover:text-black" 
            : 
            "hover:bg-dark text-dark hover:text-white active:bg-black " 
            } border-[1px] border-white w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 label {$$props.class || ''}">
            <slot>{text}</slot>
    </a>
{:else}
<button onclick={click}
        class="{filled ?
         "bg-dark bg-opacity-80 hover:bg-opacity-100 active:bg-black  text-white"
         :
         "hover:bg-dark text-dark hover:text-white active:bg-black "
         } border-[1px] border-dark w-full md:w-auto text-center mb-5 sm:mb-0 uppercase cursor-pointer text-nowrap transition-all duration-300 active:-translate-y-2 {$$props.class || ''}">
        <slot>{text}</slot>
</button>
{/if}