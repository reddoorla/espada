# Espada

Marketing site for Espada, built with **SvelteKit** (Svelte 5), **Tailwind CSS v4**, and **Prismic** as the CMS, deployed to **Netlify**.

## Stack

- **SvelteKit 2** / **Svelte 5** (runes) — `@sveltejs/adapter-netlify`
- **Tailwind CSS v4** via `@tailwindcss/vite` (config lives in [`src/app.css`](src/app.css) under `@theme`)
- **Prismic** — `@prismicio/client` v7 + `@prismicio/svelte` v2, the Prismic CLI and Type Builder for modeling
- **Vite 6**, **pnpm**, **TypeScript**
- Image optimization via `@zerodevx/svelte-img`

## Local development

```sh
pnpm install
pnpm dev          # Vite
pnpm prismic:gen  # regenerate prismicio-types.d.ts and the slice index after a model edit
```

- App: http://localhost:5173
- Models are edited in Prismic's Type Builder, which previews slices through `/slice-simulator` on the deployed site.

Set `VITE_PRISMIC_ENVIRONMENT` in a local `.env` to point at a non-default Prismic environment (defaults to the `repositoryName` in [`prismic.config.json`](prismic.config.json)).

## Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm dev`     | Dev server                                   |
| `pnpm build`   | Production build (`build/`, Netlify adapter) |
| `pnpm preview` | Preview the production build                 |
| `pnpm check`   | `svelte-kit sync` + `svelte-check`           |
| `pnpm lint`    | Prettier check + ESLint                      |
| `pnpm format`  | Prettier write                               |

## Structure

- `src/routes/` — pages. Public routes live under `[[preview=preview]]/` so Prismic preview mode works on every page. Named routes (`about`, `contact`, `property-management`, `development-and-investments`, `login`) are file-based; `[uid]` resolves arbitrary Prismic `page` documents.
- `src/lib/components/` — the components actually rendered by the site (kept lean — unused starter components were removed).
- `src/lib/slices/` — Prismic slices (currently `RichText`).
- `src/lib/prismicio.js` — Prismic client + route resolver.

## Content & preview

Content is authored in Prismic. Preview mode is wired through `@prismicio/svelte/kit` (`PrismicPreview` in the root layout, `enableAutoPreviews` in the client). The `/slice-simulator` route backs the Type Builder's slice previews.

## Deployment

Netlify builds with `pnpm build` and publishes `build/` (see [`netlify.toml`](netlify.toml), Node 22). Renovate keeps dependencies current (minor/patch auto-merge, Mondays).
