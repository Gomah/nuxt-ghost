import { GhostContentAPI } from '../../lib/module';

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
