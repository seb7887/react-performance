const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const glob = require('glob');
const { PATHS } = require('./paths');

module.exports = merge([
  {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 5000000,
      maxAssetSize: 5000000
    }
  },
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      },
      usedExports: true,
      sideEffects: true
    }
  },
  parts.clean(),
  parts.environment({ env: 'production' }),
  //parts.generateSourceMaps({ type: 'source-maps' }),
  parts.minifyJavascript(),
  parts.minifyCss({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid potentially unsafe transformations
      safe: true
    }
  }),
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
      name: '[name].[hash:4].[ext]'
    }
  }),
  parts.loadSvg({
    options: {
      limit: 15000,
      name: '[name].[hash:4].[ext]'
    }
  }),
  parts.moduleConcatenation(),
  parts.inlineManifest({ name: 'manifest' }),
  parts.bundleAnalyzer(),
  parts.compress(),
  parts.pwa()
]);
