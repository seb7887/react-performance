# How to Improve performance part I: Webpack

![webpack](./docs/images/webpack.png)

## Introduction

In this article, we’ll cover some easy webpack techniques that will serve your app faster to users, no matter what you’re using. In [this](https://github.com/seb7887/react-performance) sample app, starting from no optimization, we were able to compress our entry JS and leverage intelligent caching for snappy refreshes.

Our starting point is this:

![0-base](./docs/images/0-base.png)

## Styling

### Extracting CSS

As per configuration, all css is inlined to JavaScript. Even though this can be convenient during development, it doesn't sound ideal.

Separating CSS to a file of its own avoids the problem by letting the browser to manage it separately.

It can be possible to generate a separate CSS bundles using `mini-css-extract-plugin`. It can aggregate multiple CSS files into one. For this reason, it comes with a loader that handles the extraction process. The plugin then picks up the result aggregated by the loader and emits a separate file.
To set it up, you must install the plugin first:

```
npm i -D mini-css-extract-plugin
```

Then add to your configuration:

```javascript
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-webpack-plugin');

const ExtractCss = ({ include, exclude, use = [] }) => {
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

module.exports = merge([
  // ...
  ExtractCss({
    use: ['css-loader', 'fast-sass-loader']
  })
]);
```

### Enabling PurifyCSS

Typically, you bundle even the unused CSS. It's possible to eliminate all unused CSS.
`PurifyCSS` is a tool that can achieve this by analyzing files. It walks through your code and figures out which CSS classes are being used. Often there is enough information for it to strip unused CSS from your project.

`purifycss-webpack` allows to achieve similar results. You should use the `MiniCssExtractPlugin` with it for the best results. Install it and a glob helper first:

```
npm i -D glob purifycss-webpack purify-css
```

You also need PurifyCSS configuration as below:

```javascript
const path = require('path');
const merge = require('webpack-merge');
const PurifyCssPlugin = require('purifycss-webpack');

const purifyCss = ({ paths }) => ({
  plugins: [
    new PurifyCssPlugin({
      paths,
      minimize: true
    })
  ]
});

module.exports = merge([
  // ...
  purifyCss({
    paths: glob.sync(`${path.join(__dirname, './src')}/**/*.tsx`, {
      nodir: true
    })
  })
]);
```

### Autoprefixing

It can be challenging to remember which vendor prefixes you have to use for specific CSS rules to support a large variety of users. Autoprefixing solves this problem. It can be enabled through `PostCSS` and the `autoprefixer` plugin. Autoprefixer uses Can I Use service to figure out which rules should be prefixed and its behavior can be tuned further.

Achieving autoprefixing takes a small addition to the current setup. Install postcss-loader and autoprefixer first:

```
npm i -D postcss-loader autoprefixer
```

Add a fragment enabling autoprefixing:

```javascript
const merge = require('webpack-merge');

const autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()]
  }
});

module.exports = merge([
  // ...
  ExtractCss({
    use: ['css-loader', autoprefix(), 'fast-sass-loader']
  })
]);
```

Now our build looks like this:

![1-styling](./docs/images/1-styling.png)

## Assets

### Optimizing images

n case you want to compress your images, use `image-webpack-loader`. This type of loader should be applied first to the data, so remember to place it as the last within use listing.

Compression is particularly valuable for production builds as it decreases the amount of bandwidth required to download your image assets and speed up your site or application as a result.

```
npm i -D image-webpack-loader
```

Then add:

```javascript
const merge = require('webpack-merge');

const loadSvg = ({ include, exclude, options } = {}) => ({
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

module.exports = merge([
  // ...
  loadSvg({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  })
]);
```

Let’s see how that affects our build:
![2-assets](./docs/images/2-assets.png)

## Bundle Optimization

### Bundle Splitting

With bundle splitting, you can push the vendor dependencies to a bundle of their own and benefit from client level caching. The process can be done in such a way that the whole size of the application remains the same. Given there are more requests to perform, there's a slight overhead. But the benefit of caching makes up for this cost.

```javascript
const merge = require('webpack-merge');

module.exports = merge([
  // ...
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
      }
    }
  }
]);
```

### Minifying Javascript

The point of minification is to convert the code into a smaller form. Safe transformations do this without losing any meaning by rewriting code. In webpack 4, minification process is controlled through two configuration fields: optimization.minimize flag to toggle it and optimization.minimizer array to configure the process.

To tune the defaults, we'll attach `terser-webpack-plugin` to the project so that it's possible to adjust it.

To get started, include the plugin to the project:

```
npm i -D terser-webpack-plugin
```

To attach it to the configuration, define a part for it first:

```javascript
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const minifyJavascript = () => ({
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })]
  }
});

module.exports = merge([
  // ...
  minifyJavascript()
]);
```

### Scope hoisting

Since webpack 4, it applies scope hoisting in production mode by default. It hoists all modules to a single scope instead of writing a separate closure for each. Doing this slows down the build but gives you bundles that are faster to execute.

```javascript
const merge = require('webpack-merge');
const webpack = require('webpack');

const moduleConcatenation = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
});

module.exports = merge([
  // ...
  moduleConcatenation()
]);
```

### Minifying CSS

`optimize-css-assets-webpack-plugin` is a plugin based option that applies a chosen minifier on CSS assets. Using `MiniCssExtractPlugin` can lead to duplicated CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoids this problem by operating on the generated result and thus can lead to a better result.

To attach it to the setup, install it and cssnano first:

```
npm i -D optimize-css-assets-webpack-plugin cssnano
```

Like for JavaScript, you can wrap the idea in a configuration part:

```javascript
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const minifyCss = ({ options }) => ({
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

module.exports = merge([
  // ...
  minifyCss({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid potentially unsafe transformations
      safe: true
    }
  })
]);
```

### Three Shaking

We often use named imports on files that have a lot of other exports. It might create a case in which we don’t import all the things, but webpack would include a whole module anyway. This is where tree shaking comes in handy because it can help eliminate this dead code for us. Thanks to that, our bundle size can decrease greatly.

```javascript
const merge = require('webpack-merge');

module.exports = merge([
  // ...
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
      usedExports: true,
      sideEffects: true
    }
  }
]);
```

### Adding hashes to filenames

Even though the generated build works the file names it uses is problematic, it doesn't allow to leverage client level cache efficiently as there's no way to tell whether or not a file has changed. Cache invalidation can be achieved by including a hash to the filenames.

Webpack provides placeholders for this purpose. These strings are used to attach specific information to webpack output. The most valuable ones are:

- `[id]` - Returns the chunk id.
- `[path]` - Returns the file path.
- `[name]` - Returns the file name.
- `[ext]` - Returns the extension. `[ext]` works for most available fields. `MiniCssExtractPlugin` is a notable exception to this rule.
- `[hash]` - Returns the build hash. If any portion of the build changes, this changes as well.
- `[chunkhash]` - Returns an entry chunk-specific hash. Each entry defined in the configuration receives a hash of its own. If any portion of the entry changes, the hash will change as well. `[chunkhash]` is more granular than `[hash]` by definition.
- `[contenthash]` - Returns a hash generated based on content.

It's preferable to use particularly hash and chunkhash only for production purposes as hashing doesn't do much good during development.

Images and fonts should receive hash while chunks should use chunkhash in their names to invalidate them correctly:

```javascript
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-webpack-plugin');

const ExtractCss = ({ include, exclude, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:4].css'
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

const loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|webp|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:4].[ext]'
          }
        }
      }
    ]
  }
});

// ...

module.exports = merge([
  // ...
  {
    output: {
      path: path.join(__dirname, './dist'),
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].bundle.js'
    }
  },
  ExtractCss({
    use: ['css-loader', 'fast-sass-loader']
  }),
  loadSvg({
    options: {
      limit: 15000,
      name: '[name].[hash:4].[ext]'
    }
  }),
  loadFonts()
]);
```

### Extracting a Manifest

When webpack writes bundles, it maintains a manifest as well. You can find it in the generated vendor bundle in this project. The manifest describes what files webpack should load. It's possible to extract it and start loading the files of the project faster instead of having to wait for the vendor bundle to be loaded.

If the hashes webpack generates change, then the manifest changes as well. As a result, the contents of the vendor bundle change, and become invalidated. The problem can be eliminated by extracting the manifest to a file of its own or by writing it inline to the html of the project.

To extract the manifest, install this:

```
npm i -D inline-manifest-webpack-plugin
```

And add this to your configuration:

```javascript
const merge = require('webpack-merge');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const inlineManifest = ({ name }) => ({
  plugins: [new InlineManifestWebpackPlugin(name)]
});

module.exports = merge([
  // ...
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
  inlineManifest({ name: 'manifest' })
]);
```

## Conclusion

Our final build now looks better:

![3-optimizations](./docs/images/3-optimizations.png)

Hopefully, with all these techniques you are able to significantly cut the bundle size and improve performance.
