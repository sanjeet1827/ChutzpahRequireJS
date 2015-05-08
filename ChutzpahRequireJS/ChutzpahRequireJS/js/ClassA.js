define(["require", "exports", 'ClassB'], function(require, exports, ClassB) {
    var ClassA = (function () {
        function ClassA() {
        }
        ClassA.ClassAObject = ClassB.ClassB.obj;
        return ClassA;
    })();
    exports.ClassA = ClassA;
});
//# sourceMappingURL=ClassA.js.map
