const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCssPlugin = require('purifycss-webpack');
const webpack = require('webpack');

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()]
});

exports.environment = ({ env }) => {
  const plugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  });

  return {
    plugins: [plugin]
  };
};

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
        use: ['style-loader', 'css-loader', 'fast-sass-loader'],
        include
      }
    ]
  }
});

exports.purifyCss = ({ paths }) => ({
  plugins: [
    new PurifyCssPlugin({
      paths,
      minimize: true
    })
  ]
});

exports.extractCss = ({ include, exclude, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()]
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

exports.loadSvg = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: [
          {
            loader: 'file-loader',
            options
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  }
});

exports.loadFiles = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|webp|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  }
});
