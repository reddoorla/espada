<script lang="ts">
  import { enhance } from "$app/forms";
  import { env } from "$env/dynamic/public";
  import { loadTurnstile } from "$lib/turnstile";

  let {
    form,
    formTs,
  }: {
    form?: { success?: boolean; error?: string } | null;
    formTs?: number;
  } = $props();

  let submitting = $state(false);

  // Optional Cloudflare Turnstile — dark until PUBLIC_TURNSTILE_SITE_KEY is set;
  // rendered explicitly (works on full load + SPA nav). createIngestAction reads
  // the injected cf-turnstile-response input and forwards it for central verify.
  const turnstileSiteKey = env.PUBLIC_TURNSTILE_SITE_KEY?.trim();
  let turnstileEl = $state<HTMLDivElement>();

  $effect(() => {
    const el = turnstileEl;
    if (!turnstileSiteKey || !el) return;
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !el.isConnected) return;
        widgetId = turnstile.render(el, { sitekey: turnstileSiteKey });
      })
      .catch((err) => {
        console.warn("[turnstile] widget did not render:", err);
      });
    return () => {
      cancelled = true;
      if (widgetId !== undefined) {
        try {
          window.turnstile?.remove(widgetId);
        } catch {
          // already torn down (e.g. by navigation)
        }
      }
    };
  });
</script>

<!--
  Forwards to the central dashboard ingest via createIngestAction; spam is handled
  by the hidden honeypot + a fill-timing screen (no Netlify Forms / CAPTCHA).
  Requires FORMS_INGEST_URL + FORMS_INGEST_TOKEN in the deployed site's env.
-->
{#if form?.success}
  <p role="status" class="w-full border border-black rounded-[3px] p-4 text-black">
    Thanks — your message is on its way. We'll be in touch soon.
  </p>
{:else}
  <form
    class="w-full flex flex-col gap-8"
    method="POST"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    {#if form?.error}
      <p role="alert" class="w-full border border-red-600 rounded-[3px] p-4 text-red-700">
        {form.error}
      </p>
    {/if}

    <!-- Anti-bot: per-request timing token + a hidden honeypot. Naive bots
         fill the honeypot; a too-fast fill is caught by the timing screen. -->
    <input type="hidden" name="ts" value={formTs} />
    <input
      type="text"
      name="bot-field"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="hidden"
    />

    <div class="w-full flex flex-row justify-between">
      <input
        class="w-[calc(50%-15px)] border rounded-[3px] text-black border-black h-10 pl-4 pt-[2.5px]"
        name="firstName"
        placeholder="First Name"
        type="text"
      />
      <input
        class="w-[calc(50%-15px)] border rounded-[3px] text-black border-black h-10 pl-4 pt-[2.5px]"
        name="lastName"
        placeholder="Last Name"
        type="text"
      />
    </div>

    <input
      class="w-full border rounded-[3px] text-black border-black h-10 pl-4 pt-[2.5px]"
      name="email"
      placeholder="Your Email"
      type="email"
    />
    <input
      class="w-full border rounded-[3px] text-black border-black h-10 pl-4 pt-[2.5px]"
      name="phone"
      placeholder="Your Number"
      type="tel"
    />

    <textarea
      class="border rounded-[3px] text-black border-black h-48 pl-4 pt-[2.5px]"
      placeholder="Your Message"
      name="message"
    ></textarea>

    {#if turnstileSiteKey}
      <!-- Cloudflare Turnstile mount point; the effect renders it explicitly and
           injects a hidden cf-turnstile-response input that createIngestAction forwards. -->
      <div class="cf-turnstile" bind:this={turnstileEl}></div>
    {/if}

    <div class="w-16">
      <button
        type="submit"
        disabled={submitting}
        class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border rounded-xs w-fit mt-2 disabled:opacity-60"
        >{submitting ? "Sending…" : "Submit"}</button
      >
    </div>
  </form>
{/if}
