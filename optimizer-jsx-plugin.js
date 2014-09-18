var fs = require('fs');
var react = require('react-tools');
var reactDomPragma = require('react-dom-pragma');

module.exports = function(pageOptimizer, config) {
    pageOptimizer.dependencies.registerJavaScriptType(
        'jsx',
        {
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
                var path = this.path,
                    transformedCode;

                fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
                    if (err) {
                        return callback(err);
                    }
                    transformedCode = react.transform(reactDomPragma(src), {});
                    callback(null, transformedCode);
                });
            },
            getSourceFile: function() {
                return this.path;
            }
        });
};
