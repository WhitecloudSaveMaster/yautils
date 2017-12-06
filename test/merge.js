'use strict'

const chai = require("chai");
const yautils = require("../utils.js")

describe('merge', function() {
    describe("#merge with {}", function() {
        it(`result should be {}`, function() {
            const defaultValue = {};
            chai.expect(yautils.merge(defaultValue, {})).to.deep.equal(defaultValue);
        })

        it(`result should be {a:1, b:2, c:1}`, function() {
            const defaultValue = {a:1};
            chai.expect(yautils.merge({a:1}, {b:2}, {a:2, c:1})).to.deep.equal({a:1, b:2, c:1});
        })
    })

});
