module.exports = {
  // ビルドのエントリーポイント（起点）
  entry: {
    // 通常のビルド用
    "indexEntry": './src/ts/index.ts',
    // テスト用のファイルを作成するためのビルド用
    "testEntry": './test/testEntry.ts',
  },
  // 出力先
  output: {
    // 出力先のパス
    path: './dist',
    // 出力するファイルの名前
    // nameには、entryでkeyに指定したエントリーポイントの名前が入る
    filename: '[name].bundle.js'
  },
  // ビルドに必要なモジュールを指定
  module: {
    // loaderを指定
    loaders: [
      // test: ビルド対象を指定, 
      // include: ビルド対象に含める exclude: ビルド対象に含めない
      // loader: 使用するローダー  
      { test: /\.tsx?$/, exclude: /Spec\.ts$/, loader: 'ts-loader' },
      // useは右から使われる
      { test: /Spec\.ts$/, use: ['webpack-espower-loader', 'ts-loader'] },
    ]
  },
  // モジュールの解決に使用するオプション
  resolve: {
    // ビルド対象のファイルの拡張子を配列で指定
    extensions: [".tsx", ".ts", ".js"]
  },
  // devtool : デバッグを楽にするための開発者ツールの登録
  // ビルドしたjavascriptにsource-mapを生成
  devtool: 'inline-source-map',
};