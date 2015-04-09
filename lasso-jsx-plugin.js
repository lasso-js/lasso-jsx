var fs = require('fs');
var reactTools = require('react-tools');

try {
    var reactVersion = require('react/package.json').version;
    var versionParts = reactVersion.split('.');
    var reactMajor = Number(versionParts[0]);
    var reactMinor = Number(versionParts[1]);

    var reactToolsVersion = require('react-tools/package.json').version;
    var versionParts = reactToolsVersion.split('.');
    var reactToolsMajor = Number(versionParts[0]);
    var reactToolsMinor = Number(versionParts[1]);

    if ((reactToolsMajor !== reactMajor) || (reactToolsMinor !== reactMinor)) {
        var logger = require('raptor-logging').logger(module);
        logger.warn('optimizer-jsx is using react-tools ' + reactToolsVersion + ' to compile JSX but react ' + reactVersion + ' is installed.\n' +
            'This version mismatch may cause incompatibilities. Consider installing react-tools in your project and ' +
            'then uninstall and reinstall optimizer-jsx so that your version of react-tools will be used.\n' +
            'If you find any problems please open an issue at https://github.com/raptorjs/optimizer-jsx/issues');
    }
} catch(e) {
    // React is not a required module to do the build so ignore this error
}

function _compileFile(path, callback) {
	fs.readFile(path, {
		encoding: 'utf8'
	}, function(err, src) {
		if (err) {
			return callback(err);
		}
		callback(null, reactTools.transform(src, {}));
	});
}
module.exports = function(pageOptimizer, config) {
	pageOptimizer.dependencies.registerJavaScriptType(
		'jsx', {
			properties: {
				'path': 'string'
			},
			init: function(optimizerContext, callback) {
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

	pageOptimizer.dependencies.registerRequireExtension(
		'jsx', {
			read: function(path, optimizerContext, callback) {
				_compileFile(path, callback);
			},

			getLastModified: function(path, optimizerContext, callback) {
				optimizerContext.getFileLastModified(path, callback);
			}
		});
};
