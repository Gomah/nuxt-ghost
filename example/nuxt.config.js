const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../'),
  srcDir: __dirname,
  render: {
    resourceHints: false,
  },
  target: 'static',
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: false,
        ignoreNotFoundWarnings: true,
      },
    ],
  ],
  modules: ['../lib/module', './modules/generate', 'nuxt-buefy'],
  ghost: {
    url: 'https://demo.ghost.io',
    key: '22444f78447824223cefc48062',
    version: 'v4',
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
