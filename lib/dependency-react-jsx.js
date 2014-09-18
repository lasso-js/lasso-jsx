var fs = require('fs');
var react = require('react-tools');
var reactDomPragma = require('react-dom-pragma');

exports.create = function(options) {

	return {
   		properties: {
            'path': 'string'
        },
        init: function() {
        	if (!this.path) {
                throw new Error('"path" is required');
            }
			this.path = this.resolvePath(this.path);
        },
        read: function(context, callback) {
        	var path = this.path,
        		formatedJS;

            fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
                if (err) {
                    return callback(err);
                }
                formatedJS = react.transform(reactDomPragma(src), {});

                callback(null, formatedJS);
            });
        },
        getSourceFile: function() {
            return this.path;
        }
   	};
};