const fs = require('fs');
const request = require('request');

// hash
function createHash(hashLength) {
  return Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

function requestWFS(url, path) {
  return new Promise((resolve, reject) => {
    request({ url }, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        fs.writeFileSync(path, body);
        resolve();
      }
    });
  });
}

// create static dirs
async function createResources(urls, path, callback) {
  try {
    for (let i = 0, len = urls.length; i < len; i += 1) {
      const { uri } = urls[i];
      const suffix = uri.slice(uri.lastIndexOf('.') + 1);
      const completePath = `${path}/${i}-${createHash()}.${suffix}`;
      // eslint-disable-next-line
      await requestWFS(uri, completePath);
      if (urls[i].path === null) {
        // eslint-disable-next-line
        urls[i].path = completePath;
      }
    }
    callback(null);
  } catch (error) {
    callback(new Error(error));
  }
}

module.exports = createResources;
