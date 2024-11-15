const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mind-ar': path.resolve(__dirname, 'node_modules/mind-ar'),
    };
    return config;
  },
};
