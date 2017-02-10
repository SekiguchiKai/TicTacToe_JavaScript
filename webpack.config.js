module.exports = {
  entry: {
    "indexEntry": './src/ts/index.ts',
    "testEntry": './test/testEntry.ts',
  },

  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      // test: ビルド対象を指定, 
      // include: ビルド対象に含める exclude: ビルド対象に含めない
      // loader: 使用するローダー  
      { test: /\.tsx?$/, exclude: /Spec\.ts$/, loader: 'ts-loader' },
      { test: /Spec\.ts$/, use: ['webpack-espower-loader', 'ts-loader'] },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'inline-source-map',
};