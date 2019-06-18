const merge = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  parts.devServer({
    host: process.env.HOST,
    port: 3000
  }),
  parts.loadImages()
]);
