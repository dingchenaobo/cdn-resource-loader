"use strict";

// replace config resources
module.exports = function replaceConfigResources(config, urls) {
  urls.forEach(function (_ref) {
    var index = _ref.index,
        path = _ref.path;
    config.splice(index, 1, path);
  });
  return config;
};