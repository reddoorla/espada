import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { imagetools } from "@zerodevx/svelte-img/vite";
import tailwindcss from "@tailwindcss/vite";
import kitConfig from "./sveltekit.config.js";

export default defineConfig({
  // SvelteKit 3 takes its configuration here, not from svelte.config.js
  // (which it refuses to start beside).
  plugins: [sveltekit(kitConfig), imagetools(), tailwindcss()],
  server: {
    fs: {
      // Allow access to files from the project root.
      allow: [".."],
    },
  },
});
