[![nuxt-ghost](https://nuxt-ghost.vercel.app/preview.png)](https://nuxt-ghost.vercel.app)

# 👻 Ghost Module

[![circleci][circleci-src]][circleci-href]
[![npm version][npm-version-src]][npm-version-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-1a2b34.svg?style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Easy <a href="https://ghost.org/docs/api/v4/javascript/content/">Ghost</a> content API integration with Nuxt.js.

[📖 **Release Notes**](./CHANGELOG.md)

[🌎 **Demo**](https://nuxt-ghost.netlify.com)

## Setup

Install with yarn:

```bash
yarn add nuxt-ghost
```

Install with npm:

```bash
npm install nuxt-ghost
```

**nuxt.config.js**

```ts
module.exports = {
  modules: ['nuxt-ghost'],

  ghost: {
    /**
     * Your Ghost url
     */
    url: 'https://demo.ghost.io/ghost',

    /**
     * Your content api key
     */
    key: '22444f78447824223cefc48062',

    /**
     * Version
     * default: v4
     */
    version: 'v4',
  },
};
```

### Hook for generating ghost routes (nuxt generate & sitemap)

Create another module file in `modules/`:

```ts
// modules/sitemap.js
import { GhostContentAPI } from 'nuxt-ghost';

export default async function (ctx) {
  const config = {
    blogPrefix: '',
    tagPrefix: 'tag',
    perPage: 3,
  };

  this.nuxt.hook('generate:before', async (nuxt, generateOptions, ...oi) => {
    const $ghost = new GhostContentAPI({
      ...nuxt.options.ghost,
    });

    const [posts, tags] = await Promise.all([
      $ghost.posts.browse({
        limit: 'all',
      }),
      $ghost.tags.browse({ order: 'slug ASC', limit: 'all', include: 'count.posts' }),
    ]);

    // Post routes
    const postsRoutes = posts.map((post) => `${config.blogPrefix}/${post.slug}`);

    // Blog routes
    const blogPagesRoutes = [];
    const totalPages = Math.ceil(posts.length / config.perPage);

    if (totalPages > 1) {
      for (let page = 2; page <= totalPages; page += 1) {
        const route = `${config.blogPrefix}/page/${page}`;
        blogPagesRoutes.push(route);
      }
    }

    // Tag routes
    const tagRoutes = tags.reduce((arr, tag) => {
      const tagRoute = `${config.blogPrefix}${config.tagPrefix}/${tag.slug}`;
      arr.push(tagRoute);

      const maxPage = Math.ceil(tag.count.posts / config.perPage);

      if (maxPage > 1) {
        for (let page = 2; page <= maxPage; page += 1) {
          const route = `${config.blogPrefix}${config.tagPrefix}/${tag.slug}/page/${page}`;
          arr.push(route);
        }
      }

      return arr;
    }, []);

    const extraRoutes = [...postsRoutes, ...blogPagesRoutes, ...tagRoutes];

    generateOptions.routes = generateOptions.routes
      ? generateOptions.routes.concat(extraRoutes)
      : extraRoutes;

    // Add to the sitemap
    if (nuxt.sitemap) {
      Object.assign(nuxt.sitemap, {
        routes: [...(nuxt.sitemap.routes && [...nuxt.sitemap.routes]), ...extraRoutes],
      });
    }
  });
}
```

Then add it to the nuxt.config:

```ts
module.exports = {
  modules: ['nuxt-ghost', './modules/sitemap.js'],

  ghost: {
    /**
     * Your Ghost url
     */
    url: 'https://demo.ghost.io/ghost',

    /**
     * Your content api key
     */
    key: '22444f78447824223cefc48062',

    /**
     * Version
     * default: v4
     */
    version: 'v4',
  },
};
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## 📑 License

[MIT License](./LICENSE)

<!-- Badges -->

[circleci-src]: https://circleci.com/gh/Gomah/nuxt-ghost.svg?style=shield
[circleci-href]: https://circleci.com/gh/Gomah/nuxt-ghost
[npm-version-src]: https://img.shields.io/npm/dt/nuxt-ghost.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-ghost
[npm-downloads-src]: https://img.shields.io/npm/v/nuxt-ghost/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-ghost
[david-dm-src]: https://david-dm.org/gomah/nuxt-ghost/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/gomah/nuxt-ghost
