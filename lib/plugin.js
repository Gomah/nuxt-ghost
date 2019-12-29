import GhostContentAPI from '@tryghost/content-api';

export default async (ctx, inject) => {
  const client = new GhostContentAPI({
    url: '<%= options.url %>',
    key: '<%= options.key %>',
    version: '<%= options.version %>',
  });

  // Inject ghost to the context as $ghost
  ctx.$ghost = client;
  inject('ghost', client);
};
