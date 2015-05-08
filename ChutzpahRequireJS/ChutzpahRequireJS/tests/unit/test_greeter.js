/// <reference path="../../defs/qunit.d.ts" />
/// <reference path="../../defs/require.d.ts" />
define(["require", "exports", "js/greeter"], function(require, exports, greeter) {
    QUnit.module('greeter');

    test('says hi', function () {
        equal('Hi Me!', greeter.greet('Me'));
    });
});
//# sourceMappingURL=test_greeter.js.map
