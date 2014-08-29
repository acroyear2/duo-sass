
var sass = require('node-sass');
var extend = require('util')._extend;

module.exports = plugin;

var filename = /^(?!_).+\.(scss)/;

function plugin (options) {
  options || (options = {});
  return function *sass (file) {
    if (!filename.test(file.id)) return;
    file.src = yield compile(file.src, options);
    file.type = 'css';
  }
}

function compile (data, options) {
  return function (cb) {
    sass.render(extend(options, {
      data: data,
      success: function (res) {
        cb(null, res);
      },
      error: function (err) {
        cb(err);
      }
    }));
  };
}
