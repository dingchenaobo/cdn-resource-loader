const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const cdnResourceLoader = require.resolve('../lib/loader.js');

function runWebpack(config, cb) {
  const webpackConfig = merge({
    mode: 'production',
    output: {
      path: path.join(__dirname, 'output'),
      // libraryTarget: 'commonjs2',
    },
  }, config);
  // https://webpack.docschina.org/api/node
  webpack(webpackConfig, (webpackError, webpackStats) => {
    const err = webpackError
      || (stats.hasErrors() && stats.compilation.errors[0])
      || (stats.hasWarnings() && stats.compilation.warnings[0]);
    cb(err || null);
  });
}

describe('cdn-resource-loader(based on sass-resources-loader)', () => {
  describe('runWebpack', () => {
    runWebpack({
      
    })
  });
});
