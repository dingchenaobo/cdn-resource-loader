const sassResourcesLoader = require('sass-resources-loader');
const loaderUtils = require('loader-utils');

const cleanResources = require('./utils/cleanResources');
const createResources = require('./utils/createResources');
const replaceConfigResources = require('./utils/replaceConfigResources');

const urlRegExp = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
const dirname = './dynamic-resource-styles';
const isArray = Array.isArray;
const globalResourcesUrls = [];


module.exports = function cdnResourceLoader(source) {
  const webpack = this;

  // enable cache
  webpack.cacheable && webpack.cacheable();

  return sassResourcesLoader.call(webpack, source);
}

module.exports.pitch = function() {
  const callback = this.async();
  let resourcesFromConfig = (loaderUtils.getOptions(this) || {}).resources;
  // networks urls
  const urlsFromresources = [];

  // "sass-resources-loader" options.resources need an array!
  if (resourcesFromConfig === void 0) {
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
      console.log('success: resource download done!');
      replaceConfigResources(resourcesFromConfig, urlsFromresources);
      callback(null);
    } else {
      callback(error);
    }
  });
};
