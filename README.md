# felipefialho.com

[![license](https://img.shields.io/github/license/felipefialho/felipefialho.com.svg)](./LICENSE)

> My personal website and blog, writing about front-end since 2013.

**[felipefialho.com](https://felipefialho.com)**

Posts are written in Portuguese, with some translated to English under `/en/`. The site is static, fast and mostly plain HTML and CSS.

## Stack

- [Astro](https://astro.build/) 7 with TypeScript and plain CSS
- Markdown processed by Sätteri, with local plugins in `src/plugins` (embeds, image attributes, external links, heading anchors, reading time, in-article ads)
- [Pagefind](https://pagefind.app/) for search
- Build-time Open Graph cards with satori and sharp
- LGPD consent banner with Consent Mode v2: Google Analytics 4 loads only after consent, AdSense is lazy-loaded and personalized only with consent
- [Netlify](https://www.netlify.com/) for hosting, with the Image CDN serving legacy post images

## Getting Started

Requires the Node.js version in `.nvmrc` and [pnpm](https://pnpm.io/).

```sh
# install dependencies
$ pnpm install

# Run the project
$ pnpm dev
```

### Tasks

- `pnpm dev`: start the dev server
- `pnpm build`: type-check, build to `dist` and index the site for search
- `pnpm preview`: serve the production build locally
- `pnpm lint`: lint scripts and styles
- `pnpm lint:fix`: fix lint errors automatically

Search only works after a build, because Pagefind indexes the generated `dist`. Run `pnpm build && pnpm preview` to try it.

## Writing a post

Create a file at `content/posts/YYYY-MM-DD-slug.md`, or a folder at `content/posts/YYYY-MM-DD-slug/index.md` to keep images next to the post. The URL drops the date prefix, so both become `/blog/slug/`.

```md
---
title: Post title
date: 2026-10-01
description: One sentence used in listings and meta tags.
tags: [css, front-end]
draft: false
---
```

- `tags` and `draft` are optional, `draft` defaults to `false`
- English translations go in `content/posts-en/` with the same frontmatter plus `translationOf: <pt-slug>`

## Fonts

Mona Sans is the only typeface, subset to Latin with its variable axes pinned. To regenerate `src/assets/fonts`, run `scripts/subset-fonts.sh`. It needs `fonttools` and `brotli` (`pip install fonttools brotli`).

## License

Source code: MIT, see [LICENSE](./LICENSE).

Posts, pages and their images in [`content/`](./content): © [Felipe Fialho](https://www.linkedin.com/in/felipefialho/), all rights reserved, see [content/LICENSE.md](./content/LICENSE.md).
