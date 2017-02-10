module.exports = {
  entry: {
    "indexEntry": './src/ts/index.ts',
    "testEntry": './test/boardSpec.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /_test\.ts$/, loader: 'webpack-espower-loader' },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'inline-source-map',
};