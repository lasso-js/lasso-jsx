'use strict';
var chai = require('chai');
chai.config.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var jsxPlugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-jsx', function() {


	it('should compile a simple jsx file', function(done) {
		var myLasso = lasso.create({
			fileWriter: {
				fingerprintsEnabled: false,
				outputDir: nodePath.join(__dirname, 'static')
			},
			bundlingEnabled: true,
			plugins: [
				{
					plugin: jsxPlugin,
					config: {

					}
                    }
                ]
		});

		myLasso.optimizePage({
				name: 'testPage',
				dependencies: [
                    nodePath.join(__dirname, 'fixtures/simple.jsx')
                ]
			},
			function(err, lassoPageResult) {
				if (err) {
					return done(err);
				}

				var output = fs.readFileSync(nodePath.join(__dirname,
					'static/testPage.js'), 'utf8');
				expect(output).to.equal(
					'React.renderComponent(React.createElement(\"h1\", null, \"simple\"), document.body);'
				);
				done();
			});
	});

});
