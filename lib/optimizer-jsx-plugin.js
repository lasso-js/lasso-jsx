module.exports = function(pageOptimizer, config) {
    
   	pageOptimizer.dependencies.registerJavaScriptType(
        'jsx',
        require('./dependency-react-jsx').create(config)
    );
};