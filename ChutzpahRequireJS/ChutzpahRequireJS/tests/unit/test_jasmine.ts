/// <reference path="../../defs/jasmine.d.ts" />
/// <reference path="../../defs/require.d.ts" />

import ClassA = require("js/ClassA");

describe("Jasmine - test case", () => {

    it("Jasmine - Class A object should be defined", () => {
        expect(ClassA.ClassA.ClassAObject).toBeDefined();
    })

});