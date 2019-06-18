const merge = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  parts.clean(),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  })
]);
