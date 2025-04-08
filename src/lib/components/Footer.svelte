<script lang='ts'>
  import ContentWidth from "./ContentWidth/ContentWidth.svelte";
  import espadaLogo from '$lib/assets/icons/logos/espadaLogo.svg'
  import DefaultButton from "./Buttons/DefaultButton.svelte";

</script>

<footer class="w-screen">
    <ContentWidth class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 h-48 py-10">
        <div class="flex flex-col gap-6 justify-between items-start h-full relative">
            <a href="/" class="bump">
				<img src={espadaLogo} class="h-12" alt="logo"/>
			</a>
            <div class="label">
                1160 E. Commerce Street, Suite 200 <br/> San Antonio, TX 78205 <br/>
                210.905.0500
            </div>
        </div>
        <div class="flex flex-col gap-6 items-end justify-between h-full pb-6">
            <DefaultButton href="/contact">Contact Us</DefaultButton>
            <div class="label">{"Copyright All Rights Reserved © "+ new Date().getFullYear()} </div>
        </div>
    </ContentWidth>

</footer>
