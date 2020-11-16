const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

const stylesheetsLoaders = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      modules: {
        mode: 'local',
        localIdentName: '[path][name]__[local]',
      },
      sourceMap: true,
    },
  },
  'postcss-loader',
];

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: 'index.html',
});

module.exports = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry: [
    'core-js/stable',
    'react-hot-loader/patch',
    './index',
  ],
  output: {
    filename: '[hash].js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  plugins: [htmlWebpackPlugin],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    port: process.env.PORT || 5000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: stylesheetsLoaders,
      },
      {
        test: /\.scss$/,
        use: [
          ...stylesheetsLoaders,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      }
    ]
  },
};