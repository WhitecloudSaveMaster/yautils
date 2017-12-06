'use strict'

const chai = require("chai");
const yautils = require("../utils.js")

describe('format', function() {
    describe("#format with {}", function() {
        it(`result should be {}`, function() {
            const defaultValue = {};
            chai.expect(yautils.format(defaultValue, {})).to.deep.equal(defaultValue);
        })

        it(`result should be {a:1}`, function() {
            const defaultValue = {a:1};
            chai.expect(yautils.format(defaultValue, {})).to.deep.equal(defaultValue);
        })
    })

    describe("#format with value", function() {
        it(`result should be {a:2}`, function() {
            const defaultValue = {a:1};
            chai.expect(yautils.format(defaultValue, {a:2})).to.deep.equal({a:2});
        })

        it(`result should be {a:1, b:2}`, function() {
            const defaultValue = {a:1, b:1};
            chai.expect(yautils.format(defaultValue, {b:2})).to.deep.equal({a:1, b:2});
        })
    })

    describe("#format.option", function() {
        it(`result should be {a:1, b:2}`, function() {
            const defaultValue = {a:1, b:1};
            chai.expect(yautils.format.option(defaultValue, {b:2})).to.deep.equal({a:1, b:2});
        })

        it(`result should be freezed`, function() {
            const defaultValue = {a:1, b:1};
            chai.expect( Object.isFrozen(yautils.format.option(defaultValue, {})) ).to.be.true;
        })
    })

    describe("#format with error", function() {
        it(`Invalid key should throw error`, function() {
            chai.expect(function() {yautils.format({}, {a:1})}).to.throw();
        })
    })

});
