'use strict';

const babelCore = require('babel-core');

function _compileFile(path, callback) {
  babelCore.transformFile(path, {}, function(err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result.code);
  });
}

module.exports = function(lasso, config) {
  lasso.dependencies.registerJavaScriptType('jsx', {
    properties: {
      'path': 'string'
    },
    init: function(lassoContext, callback) {
      if (!this.path) {
        var pathError = new Error('"path" is required');
        if (callback) return callback(pathError);
        throw pathError;
      }

      this.path = this.resolvePath(this.path);
      if (callback) callback();
    },
    read: function(context, callback) {
      return new Promise((resolve, reject) => {
        callback = callback || function(err, res) {
          return err ? reject(err) : resolve(res);
        };
        _compileFile(this.path, callback);
      });
    },
    getSourceFile: function() {
      return this.path;
    }
  });

  lasso.dependencies.registerRequireExtension('jsx', {
    read: function(path, lassoContext, callback) {
      return new Promise((resolve, reject) => {
        callback = callback || function(err, res) {
          return err ? reject(err) : resolve(res);
        };
        _compileFile(path, callback);
      });
    },

    getLastModified: function(path, lassoContext, callback) {
      return lassoContext.getFileLastModified(path, callback);
    }
  });
};
