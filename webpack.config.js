// next.config.js
const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@src': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};
