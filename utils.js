'use strict'

const isKindOf = module.exports.isKindOf = function(value, type) {
    switch (typeof value) {
        case "string":
            return type === String;
        case "undefined":
            return type === undefined;
        case "boolean":
            return type === Boolean;
        case "number":
            return ((isNaN(type) && type !== type) && (isNaN(value) && value !== value))
            || (type === Number && !isNaN(value));
        case "function":
            return type === Function;
        case "object":
            if (value === null && type === null) return true;
            if (value === null || type === null) return false;
            if (typeof type !== "function") return false;
            if (type !== Object) {
                return value instanceof type;
            } else {
                return value.constructor === Object || value.constructor === undefined //for Object.create(null);
            }
            break;
        default:
            throw new Error("Not implemented");
    }
}

const throwErr = module.exports.throwErr = function(msg, opt) {
    if (!isKindOf(opt, Object)) opt = {};
    if (!isKindOf(msg, String)) throwErr("Illegal error message", {
        "disFiles": __filename,
        "type": TypeError
    })
    if (isKindOf(opt.disFiles, String)) opt.disFiles = [opt.disFiles];

    const options = format.option({
        "disSelf": true,
        "disFiles": [],
        "code": undefined,
        "type": Error
    }, opt);

    const err = new options.type(msg);
    if (isKindOf(options.code, Number)) {
        err.code = options.code;
    }

    if (options.disSelf && options.disFiles.indexOf(__filename) === -1) {
        options.disFiles.push(__filename);
    }

    if (options.disFiles.length) {
        const stacks = err.stack.split("\n");
        for (let i = stacks.length; i >= 0 ; i--) {
            const stack = stacks[i];
            if (isKindOf(stack, String) && stack.trim().indexOf("at") === 0) {
                for (let j = 0; j < options.disFiles.length; j++) {
                    if (stack.indexOf(options.disFiles[j]) !== -1) {
                        stacks.splice(i, 1);
                        break;
                    }
                }
            }
        }
        err.stack = stacks.join("\n");
    }

    throw err;
}

const valid = module.exports.valid = function(options, value) {

}

const format = module.exports.format = function(defaultValue, value) {
    const result = {};
    Object.keys(value).forEach(function(key) {
        if (defaultValue.hasOwnProperty(key)) {
            result[key] = value[key];
        } else {
            throw throwErr(`Invaild key: ${key}`);
        }
    });
    Object.keys(defaultValue).forEach(function(key) {
        if (value[key] === undefined) {
            result[key] = defaultValue[key];
        }
    });
    return result;
}

format.option = function(defaultValue, value) {
    const result = Object.create(null);
    const fResult = format(defaultValue, value);
    Object.keys(fResult).forEach(function(key) {
        result[key] = fResult[key];
    });
    return Object.freeze(result);
}

const merge = module.exports.merge = function(...params) {
    var result = {};
    for (var i = params.length - 1; i >= 0 ; i--) {
        let value = params[i]
        Object.keys(value).forEach(function(key) {
            result[key] = value[key];
        });
    }
    return result;
}
