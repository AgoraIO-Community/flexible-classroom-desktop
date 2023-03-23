module.exports.dev = [
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
    test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf)$/,
    type: 'asset',
    generator: {
      filename: './assets/[name].[hash:8].[ext]',
    },
  },
];
