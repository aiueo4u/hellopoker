const webpack = require('webpack');
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const contextPath = path.join(__dirname, 'frontend', 'javascript');
const sourcePath = 'app/javascript';
const fileExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.tiff',
  '.ico',
  '.svg',
  '.eot',
  '.otf',
  '.ttf',
  '.woff',
  '.woff2',
];

module.exports = (env, argv) => {
  const mode = argv.mode && argv.mode === 'development' ? 'development' : 'production';
  const appMode = mode === 'development' ? mode : (argv['app-mode'] || 'production');

  let chunkFilename, filename, publicPath;

  switch (appMode) {
    case 'development':
      chunkFilename = 'js/[name]-[hash].chunk.js';
      filename = 'js/[name]-[hash].js';
      publicPath = '/webpacks/';
      break;
    default: // production
      chunkFilename = 'js/[name]-[chunkhash].chunk.js';
      filename = 'js/[name]-[chunkhash].js';
      publicPath = '/webpacks/';
      break;
  }

  let config = {
    mode: mode,
    context: contextPath,
    output: {
      filename: filename,
      chunkFilename: chunkFilename,
      hotUpdateChunkFilename: 'js/[id]-[hash].hot-update.js',
      path: path.resolve(__dirname, 'public/webpacks'),
      publicPath: publicPath,
      pathinfo: mode === 'development',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.png', '.svg', '.gif', '.jpeg', '.jpg'],
      plugins: [PnpWebpackPlugin],
      modules: [contextPath, 'node_modules'],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin],
      modules: ['node_modules'],
    },
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: true,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
    },
    entry: {
      indexDesktop: path.join(contextPath, 'indexDesktop.js'),
      indexMobile: path.join(contextPath, 'indexMobile.js'),
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          parser: {
            requireEnsure: false,
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: { loader: 'ts-loader', options: { configFile: path.resolve(__dirname, 'tsconfig.json') } },
        },
        {
          test: /(.jpg|.jpeg|.png|.gif|.tiff|.ico|.svg|.eot|.otf|.ttf|.woff|.woff2|.mp3)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: contextPath,
              },
            },
          ],
        },
        getStyle(/\.(css)$/i),
        getStyle(/\.(scss|sass)$/i, false, [
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]),
        getStyle(/\.(css)$/i, true),
        getStyle(/\.(scss|sass)$/i, true, [
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]),
        {
          test: /\.(js|jsx|mjs)?(\.erb)?$/,
          include: [contextPath],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: 'tmp/cache/webpacker/babel-loader-node-modules',
                cacheCompression: false,
                compact: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:8].css',
        chunkFilename: 'css/[name]-[contenthash:8].chunk.css',
      }),
      new WebpackAssetsManifest({
        entrypoints: true,
        writeToDisk: true,
        publicPath: '/webpacks/',
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ja/),
    ],
  };

  if (mode === 'development') {
    config.devtool = 'cheap-module-source-map';
    config.devServer = {
      clientLogLevel: 'warning',
      compress: true,
      quiet: false,
      disableHostCheck: true,
      host: 'localhost',
      port: 3045,
      https: false,
      hot: true,
      contentBase: path.resolve(__dirname, 'public/webpacks'),
      inline: true,
      useLocalIp: false,
      public: 'localhost:3045',
      publicPath: '/webpacks/',
      historyApiFallback: {
        disableDotRule: true,
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      overlay: true,
      stats: {
        entrypoints: false,
        errorDetails: false,
        modules: false,
        moduleTrace: false,
      },
      watchOptions: { ignored: '**/node_modules/**' },
    };
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|jsx)$/i,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      use: 'react-hot-loader/webpack',
      include: /node_modules/
    });
  } else {
    // mode: production
    config.devtool = 'source-map';
    config.stats = 'normal';
    config.bail = true;
    config.plugins.push(
      new CompressionPlugin({
        cache: true,
        test: /\.(js|css|html|json|ico|svg|eot|otf|ttf|map)$/,
      })
    );
    config.plugins.push(
      new OptimizeCssAssetsWebpackPlugin({
        parser: safePostCssParser,
        map: {
          inline: false,
          annotation: true,
        },
      })
    );
    config.optimization.splitChunks = {
      chunks: 'all',
      name: false,
    };
    config.optimization.runtimeChunk = true;
  }

  return config;
};

function getStyle(test, modules = false, preprocessors = []) {
  let use = [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
        modules,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve(__dirname),
        },
        sourceMap: true,
      },
    },
    ...preprocessors,
  ];


  const sideEffects = !modules;
  const options = modules ? { include: /\.module\.[a-z]+$/ } : { exclude: /\.module\.[a-z]+$/ };

  return Object.assign({}, { test, use, sideEffects }, options);
}
