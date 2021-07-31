import path from 'path';
import GhostContentAPI from '@tryghost/content-api';

function ghostModule(_moduleOptions = {}) {
  const { ghost = {} } = this.options;

  // Combine options
  const moduleOptions = {
    version: 'v4',
    ...ghost,
    ..._moduleOptions,
  };

  if (!moduleOptions.url || !moduleOptions.key) {
    throw new Error(`[Ghost Module] URL & Key must be provided.`);
  }

  // Add plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'ghost.js',
    options: moduleOptions,
  });
}

module.exports = ghostModule;
module.exports.GhostContentAPI = GhostContentAPI;
module.exports.meta = require('../package.json');
