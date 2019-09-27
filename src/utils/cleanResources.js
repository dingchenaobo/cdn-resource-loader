const fs = require('fs');

// deep clean dir
function delDir(path) {
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach(file => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
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
