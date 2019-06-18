const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const parts = require('./build-utils/webpack.parts');
const { PATHS } = require('./build-utils/paths');

const commonConfig = merge([
  parts.loadTypescript({ include: PATHS.entry, exclude: /node_modules/ }),
  parts.loadFiles()
]);

module.exports = ({ mode }) => {
  const modeConfig = require(`./build-utils/webpack.${mode}.js`);
  return merge(
    {
      mode,
      entry: ['./src/index.tsx'],
      output: {
        path: PATHS.output,
        filename: '[name].bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: PATHS.html
        }),
        new CopyWebpackPlugin([{ from: PATHS.favicon, to: PATHS.output }])
      ]
    },
    commonConfig,
    modeConfig
  );
};
