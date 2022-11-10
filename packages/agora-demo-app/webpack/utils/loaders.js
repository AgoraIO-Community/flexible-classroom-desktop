const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ROOT_PATH } = require('.');

module.exports.dev = [
  {
    test: /\.css$/i,
    use: [
      {
        loader: 'thread-loader',
      },
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          import: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            config: path.resolve(ROOT_PATH, '../agora-classroom-sdk/postcss.config.js'),
          },
        },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf)$/,
    type: 'asset',
    generator: {
      filename: 'static/[name].[hash:8].[ext]',
    },
  },
];

module.exports.prod = [
  {
    test: /\.css$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            config: path.resolve(ROOT_PATH, '../agora-classroom-sdk/postcss.config.js'),
          },
        },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf)$/,
    type: 'asset',
    generator: {
      filename: './assets/[name].[hash:8].[ext]',
    },
  },
];
