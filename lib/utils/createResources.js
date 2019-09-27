"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var request = require('request'); // hash


function createHash(hashLength) {
  return Array.from(Array(Number(hashLength) || 24), function () {
    return Math.floor(Math.random() * 36).toString(36);
  }).join('');
}

function requestWFS(url, path) {
  return new Promise(function (resolve, reject) {
    request({
      url: url
    }, function (err, response, body) {
      if (err) {
        reject(err);
      } else {
        fs.writeFileSync(path, body);
        resolve();
      }
    });
  });
} // create static dirs


function createResources(_x, _x2, _x3) {
  return _createResources.apply(this, arguments);
}

function _createResources() {
  _createResources = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(urls, path, callback) {
    var i, len, uri, suffix, completePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            i = 0, len = urls.length;

          case 2:
            if (!(i < len)) {
              _context.next = 12;
              break;
            }

            uri = urls[i].uri;
            suffix = uri.slice(uri.lastIndexOf('.') + 1);
            completePath = "".concat(path, "/").concat(i, "-").concat(createHash(), ".").concat(suffix);
            _context.next = 8;
            return requestWFS(uri, completePath);

          case 8:
            if (urls[i].path === null) {
              urls[i].path = completePath;
            }

          case 9:
            i += 1;
            _context.next = 2;
            break;

          case 12:
            callback(null);
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            callback(new Error(_context.t0));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));
  return _createResources.apply(this, arguments);
}

module.exports = createResources;