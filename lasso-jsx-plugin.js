var babelCore = require("babel-core");

function _compileFile(path, callback) {
    babelCore.transformFile(path, {}, function(err, result) {
        if (err) {
            return callback(err);
        }

        callback(null, result.code);
    });
}
module.exports = function(lasso, config) {
	lasso.dependencies.registerJavaScriptType(
		'jsx', {
			properties: {
				'path': 'string'
			},
			init: function(lassoContext, callback) {
				if (!this.path) {
					return callback(new Error('"path" is required'));
				}
				this.path = this.resolvePath(this.path);
				callback();
			},
			read: function(context, callback) {
                _compileFile(this.path, callback);
			},
			getSourceFile: function() {
				return this.path;
			}
		});

	lasso.dependencies.registerRequireExtension(
		'jsx', {
			read: function(path, lassoContext, callback) {
				_compileFile(path, callback);
			},

			getLastModified: function(path, lassoContext, callback) {
				lassoContext.getFileLastModified(path, callback);
			}
		});
};
