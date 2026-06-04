// Shared prop types for the component library.

/**
 * Source for an image rendered through either `<Img>` (@zerodevx/svelte-img,
 * imagetools `?as=run` object) or a plain `<img>` element (string URL such as
 * an imported `.svg`/`.jpg` placeholder). Components branch on
 * `typeof src === "object"` to pick the renderer, so the prop is the union of
 * the two shapes.
 */
export type ImageSource = string | object;
