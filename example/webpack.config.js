const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root_path = path.resolve(__dirname);

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: root_path + '/index.js',
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  resolveLoader: {
    modules: [
      'node_modules',
    ],
    alias: {
      'cdn-resource-loader': path.resolve(__dirname, '../lib/loader.js'),
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]-[contenthash:base64:8]'
            }
          }
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        },
        {
          loader: 'cdn-resource-loader',
          options: {
            resources: [
              './theme-local.less',
              'https://raw.githubusercontent.com/dingchenaobo/cdn-resource-loader/master/example/theme-cdn.less'
            ]
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: root_path + '/public/index.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      chunksSortMode: 'none'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 4200,
    hot: true,
    inline: true,
    compress: true,
    overlay: true,
  },
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
  },
}
