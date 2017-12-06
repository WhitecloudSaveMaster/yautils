'use strict'

const chai = require("chai");
const yautils = require("../utils.js")

describe('isKindOf', function() {
    const TestClass = function() {}

    const types = [String, Number, Boolean, Object, Array, Date, Buffer, Function, TestClass, Error, NaN, undefined, null];
    const values = ["test", 1, true, {}, [], new Date(), Buffer.alloc(5), function() {}, new TestClass(), new Error("test"), NaN, undefined, null];

    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let typeName = type? type.name : type;
        describe(`#isKindOf ${typeName}`, function() {
            for (let j = 0; j < values.length; j++) {
                let value = values[j];
                it(`${value} isKindOf ${typeName} should be ${i === j}`, function() {
                    if (i === j) {
                        chai.expect(yautils.isKindOf(value, type)).to.be.true;
                    } else {
                        chai.expect(yautils.isKindOf(value, type)).to.be.false;
                    }
                });
            }
        })
    }

    describe(`#isKindOf nullObject`, function() {
        it(`Object.create(null) should be Object`, function() {
            chai.expect(yautils.isKindOf(Object.create(null), Object)).to.be.true;
        })
    });
});
