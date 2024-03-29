---
title: Nuxt Generate & Sitemap
description: 'Easy Ghost content API integration with Nuxt.js'
position: 3
category: 'Helpers'
---

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
