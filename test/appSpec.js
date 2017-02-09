"use strict";
var assert = require("power-assert");
var ts_1 = require("../src/ts");
describe("lib", function () {
    describe("hello function", function () {
        it("generate string with default value", function () {
            var str = ts_1.hello();
            assert(str === "Hello, TypeScript");
        });
        it("generate string with parameter", function () {
            var str = ts_1.hello("JavaScript");
            assert(str === "Hello, JavaScript");
        });
    });
});
