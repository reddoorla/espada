declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    // svelte-gestures v4 only ships Svelte 4 `on:swipe` directive typings, not the
    // Svelte 5 attribute-style `onswipe={...}` handler used with `use:swipe`.
    onswipe?: (
      event: CustomEvent<{
        direction: "top" | "right" | "bottom" | "left";
        target: EventTarget;
      }>,
    ) => void;
  }
}
