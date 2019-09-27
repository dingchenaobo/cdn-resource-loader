"use strict";

var fs = require('fs'); // deep clean dir


function delDir(path) {
  var files = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file) {
      var curPath = path + "/" + file;

      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function cleanResources(path) {
  if (fs.existsSync(path)) delDir(path);
  fs.mkdirSync(path);
}

module.exports = cleanResources;