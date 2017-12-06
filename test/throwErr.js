'use strict'

const chai = require("chai");
const yautils = require("../utils.js")

const throwErr = function() {
    yautils.throwErr("error message");
}

describe('throwErr', function() {
    describe("#Throw error", function() {
        it (`should throw error`, function() {
            chai.expect(throwErr).to.throw();
        })
    })

    describe('#Err with msg', function() {
        it(`error.message should be 'error message'`, function() {
            try {
                throwErr();
            } catch (e) {
                chai.expect(e.message).to.equal("error message");
            }
        })
    })

    describe('#Err with type', function() {
        it(`error type should be 'TypeError'`, function() {
            try {
                yautils.throwErr("test", {
                    "type": TypeError
                });
            } catch (e) {
                chai.expect(e instanceof TypeError).to.be.true;
            }
        })
    })

    describe('#Err with code', function() {
        it(`error code should be 592`, function() {
            try {
                yautils.throwErr("test", {
                    "code": 592
                });
            } catch (e) {
                chai.expect(e.code).to.equal(592);
            }
        })
    })

    describe('#throwErr with disFiles', function() {
        it(`disFile is String`, function() {
            try {
                yautils.throwErr("test", {
                    "disFiles": __filename
                })
            } catch (e) {
                chai.expect(e.stack.indexOf(__filename)).to.equal(-1);
            }
        })

        it(`disFile is Array`, function() {
            try {
                yautils.throwErr("test", {
                    "disFiles": [__filename]
                })
            } catch (e) {
                chai.expect(e.stack.indexOf(__filename)).to.equal(-1);
            }
        })
    })

    describe('#throwErr with disSelf', function() {
        it(`disSelf is false`, function() {
            try {
                yautils.throwErr("test", {
                    disSelf: false
                });
            } catch (e) {
                chai.expect(e.stack.split("\n")[1].indexOf(__filename)).to.equal(-1);
            }
        })

        it(`disSelf is true`, function() {
            try {
                yautils.throwErr("test", {
                    disSelf: true
                });
            } catch (e) {
                chai.expect(e.stack.split("\n")[1].indexOf(__filename)).to.not.equal(-1);
            }
        })
    })
});
