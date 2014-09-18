'use strict';

var chai = require('chai');
chai.config.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var extend = require('raptor-util/extend');
var nodePath = require('path');

function Dependency(dirname) {
    this.__dirname = dirname;
}

Dependency.prototype = {
    resolvePath: function(path) {
    	console.log('resolvePath - ' + nodePath.resolve(this.__dirname, path));
        return nodePath.resolve(this.__dirname, path);
    }
};

function createDependency(properties, jsxOptions) {
    var dependencyJsx = require('../lib/dependency-react-jsx').create(jsxOptions);

    var dirname = properties.dirname;

    if (!dirname) {
        dirname = nodePath.join(__dirname, 'fixtures');
    }

    var d = new Dependency(dirname);
    extend(d, dependencyJsx || {});
    extend(d, properties || {});
    d.init();
    
    return d;

}
describe('optimizer-jsx tests' , function() {

    beforeEach(function(done) {
        for (var k in require.cache) {
            if (require.cache.hasOwnProperty(k)) {
                delete require.cache[k];
            }
        }
        done();
    });

    it('should compile a simple js file', function(done) {
        var d = createDependency({
            path: 'simple.jsx'
        });

        d.read({}, function(err, js) {
            if (err) {
                return done(err);
            }
            expect(js).to.equal('/** @jsx React.DOM */\nReact.renderComponent(React.DOM.h1(null, "simple"), document.body);');
            done();
        });
    });

	it('should contain @jsx comment in the compiled js file', function(done) {
        var d = createDependency({
            path: 'simple.jsx'
        });

        d.read({}, function(err, js) {
            if (err) {
                return done(err);
            }
            expect(js).to.contain('/** @jsx');
            done();
        });
    });
});