const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const glob = require('glob');
const { PATHS } = require('./paths');

module.exports = merge([
  parts.clean(),
  parts.environment({ env: 'production' }),
  parts.extractCss({
    include: PATHS.styles,
    use: ['css-loader', parts.autoprefix(), 'fast-sass-loader']
  }),
  parts.purifyCss({
    paths: glob.sync(`${PATHS.entry}/**/*.tsx`, { nodir: true })
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  }),
  parts.loadSvg({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  })
]);
