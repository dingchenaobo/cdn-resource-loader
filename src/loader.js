require('@babel/polyfill');

const sassResourcesLoader = require('sass-resources-loader');
const loaderUtils = require('loader-utils');

const cleanResources = require('./utils/cleanResources');
const createResources = require('./utils/createResources');
const replaceConfigResources = require('./utils/replaceConfigResources');

// eslint-disable-next-line
const urlRegExp = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
const { isArray } = Array;
const globalResourcesUrls = [];


module.exports = function cdnResourceLoader(source) {
  const webpack = this;

  // enable cache
  if (webpack.cacheable) {
    webpack.cacheable();
  }

  return sassResourcesLoader.call(webpack, source);
};

module.exports.pitch = function cdnResourceLoader() {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  let resourcesFromConfig = options.resources;
  let dirname = options.dirname || './dynamic-resource-styles';
  // networks urls
  const urlsFromresources = [];

  // "sass-resources-loader" options.resources need an array!
  if (resourcesFromConfig === undefined) {
    throw new Error('"cdn-resources-loader" options.resources need an array!');
  }

  // is not array
  if (!isArray(resourcesFromConfig)) {
    resourcesFromConfig = [resourcesFromConfig];
  }

  // first init clean resources
  if (!globalResourcesUrls.length) {
    cleanResources(dirname);
  }

  // filter networks urls
  resourcesFromConfig.forEach((path, index) => {
    if (urlRegExp.test(path)) {
      const uri = { uri: path, index, path: null };
      if (!globalResourcesUrls.includes(path)) {
        urlsFromresources.push(uri);
      }
      globalResourcesUrls.push(path);
    }
  });

  createResources(urlsFromresources, dirname, (error) => {
    if (!error) {
      // console.log('success: resource download done!');
      replaceConfigResources(resourcesFromConfig, urlsFromresources);
      callback(null);
    } else {
      callback(error);
    }
  });
};
