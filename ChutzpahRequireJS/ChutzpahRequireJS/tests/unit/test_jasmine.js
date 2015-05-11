/// <reference path="../../defs/jasmine.d.ts" />
/// <reference path="../../defs/require.d.ts" />
define(["require", "exports", "js/ClassA"], function(require, exports, ClassA) {
    describe("Jasmine - test case", function () {
        it("Jasmine - Class A object should be defined", function () {
            expect(ClassA.ClassA.ClassAObject).toBeDefined();
        });
    });
});
//# sourceMappingURL=test_jasmine.js.map
