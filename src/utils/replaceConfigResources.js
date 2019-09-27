// replace config resources
module.exports = function replaceConfigResources(config, urls) {
  urls.forEach(({ index, path }) => {
    config.splice(index, 1, path);
  });
  return config;
};
