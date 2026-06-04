<script lang="ts">
  let submit = () => form.submit();
  let form: HTMLFormElement;

  let selectValue = $state("");
</script>

<form
  class="w-full flex flex-col gap-8"
  name="contact"
  method="post"
  bind:this={form}
  netlify
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />

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
    type="phone"
  />

  <input name="select" type="select" bind:value={selectValue} hidden />

  <textarea
    class="border rounded-[3px] text-black border-black h-48 pl-4 pt-[2.5px]"
    placeholder="Your Message"
    name="message"
  ></textarea>

  <div class="w-16">
    <button
      onclick={submit}
      class="nav-link text-black py-4 px-5 border-black transition hover:text-white hover:bg-black border rounded-xs w-fit mt-2"
      >Submit</button
    >
  </div>
</form>
