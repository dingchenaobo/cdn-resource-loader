"use strict";

require('@babel/polyfill');

var sassResourcesLoader = require('sass-resources-loader');

var loaderUtils = require('loader-utils');

var cleanResources = require('./utils/cleanResources');

var createResources = require('./utils/createResources');

var replaceConfigResources = require('./utils/replaceConfigResources'); // eslint-disable-next-line


var urlRegExp = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
var isArray = Array.isArray;
var globalResourcesUrls = [];

module.exports = function cdnResourceLoader(source) {
  var webpack = this; // enable cache

  if (webpack.cacheable) {
    webpack.cacheable();
  }

  return sassResourcesLoader.call(webpack, source);
};

module.exports.pitch = function cdnResourceLoader() {
  var callback = this.async();
  var options = loaderUtils.getOptions(this) || {};
  var resourcesFromConfig = options.resources;
  var dirname = options.dirname || './dynamic-resource-styles'; // networks urls

  var urlsFromresources = []; // "sass-resources-loader" options.resources need an array!

  if (resourcesFromConfig === undefined) {
    throw new Error('"cdn-resources-loader" options.resources need an array!');
  } // is not array


  if (!isArray(resourcesFromConfig)) {
    resourcesFromConfig = [resourcesFromConfig];
  } // first init clean resources


  if (!globalResourcesUrls.length) {
    cleanResources(dirname);
  } // filter networks urls


  resourcesFromConfig.forEach(function (path, index) {
    if (urlRegExp.test(path)) {
      var uri = {
        uri: path,
        index: index,
        path: null
      };

      if (!globalResourcesUrls.includes(path)) {
        urlsFromresources.push(uri);
      }

      globalResourcesUrls.push(path);
    }
  });
  createResources(urlsFromresources, dirname, function (error) {
    if (!error) {
      // console.log('success: resource download done!');
      replaceConfigResources(resourcesFromConfig, urlsFromresources);
      callback(null);
    } else {
      callback(error);
    }
  });
};