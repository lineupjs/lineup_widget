var loaders = [
  {test: /\.ts$/, loader: 'ts-loader'},
  {test: /\.json$/, loader: 'json-loader'},
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  {test: /\.js$/, loader: 'source-map-loader'},
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
    options: {
      limit: 20000 //inline <= 10kb
    }
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    options: {
      limit: 20000, //inline <= 20kb
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.svg(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    options: {
      limit: 10000, //inline <= 10kb
      mimetype: 'image/svg+xml'
    }
  },
  {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
];

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: __dirname + '/lineup_widget/nbextension/static',
    libraryTarget: 'amd'
  },
  module: {
    loaders: loaders
  },
  devtool: 'source-map',
  externals: ['@jupyter-widgets/base'],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  }
};
