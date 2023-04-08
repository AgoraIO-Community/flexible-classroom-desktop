const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { ROOT_PATH } = require('../utils');

const jsLoader = {
  test: /\.(t|j)s(x)?$/,
  exclude:
    /(node_modules)|(agora-common-libs)|(agora-rte-sdk)|(agora-edu-core)|(agora-edu-core)|(agora-classroom-sdk)|(agora-proctor-sdk)|(agora-onlineclass-sdk)/,
  use: [
    {
      loader: 'thread-loader',
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              debug: false,
              corejs: {
                version: 3,
                proposals: true,
              },
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          ['@babel/preset-typescript', { allowDeclareFields: true }],
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true,
            },
          ],
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true,
            },
          ],
        ],
      },
    },
  ],
};

module.exports.dev = [
  jsLoader,
  {
    test: /\.css$/i,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            config: path.resolve(ROOT_PATH, './postcss.config.js'),
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
  jsLoader,
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
            config: path.resolve(ROOT_PATH, 'postcss.config.js'),
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

module.exports.devSdk = [
  {
    test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf)$/,
    type: 'asset',
    generator: {
      filename: 'static/[name].[hash:8].[ext]',
    },
  },
];
