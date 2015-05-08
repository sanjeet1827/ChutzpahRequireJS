/// <reference path="defs/require.d.ts" />

require(['require'], function(require) {        
    
    var testModules = [
        "tests/unit/test_greeter.js", "tests/unit/test_jasmine.js",      
    ];
    
    require(testModules);
      
    // Use something like the following when there are multiple test modules and you want
    // to ensure they are loaded in order.
    /*
    function requireNext(modules, index) {
        if (index < modules.length) {
            require([modules[index]], function() {                
                requireNext(modules, index + 1);
            });
        }
    }

    requireNext(testModules, 0);
    */
});