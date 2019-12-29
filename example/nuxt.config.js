const resolve = require('path').resolve;

module.exports = {
  rootDir: resolve(__dirname, '../'),
  srcDir: __dirname,
  render: {
    resourceHints: false,
  },
  modules: ['../lib/module', 'nuxt-buefy'],
  ghost: {
    url: 'https://demo.ghost.io',
    key: '22444f78447824223cefc48062',
    version: 'v3',
  },
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production',
};
