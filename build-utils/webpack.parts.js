const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()]
});

exports.loadTypescript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include,
        exclude
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
});

exports.loadSass = ({ include }) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'resolve-url-loader'
        ],
        include
      }
    ]
  }
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    open: true
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});

exports.loadFiles = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ]
  }
});
