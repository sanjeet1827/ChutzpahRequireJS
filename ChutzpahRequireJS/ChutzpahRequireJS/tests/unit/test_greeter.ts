/// <reference path="../../defs/qunit.d.ts" />
/// <reference path="../../defs/require.d.ts" />

import greeter = require("js/greeter");

QUnit.module('greeter');

test('says hi', function() {    
    equal('Hi Me!', greeter.greet('Me'));
});