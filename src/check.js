'use strict';
function extendType(proto, extensions) {
    extensions.forEach(ext => {
        proto[ext.name] = ext;
    });
}
function getType(object) {
    return object instanceof Array ? 'array' : typeof object;
}

function isInCorrectTypes(types, object) {
    return types.indexOf(getType(object)) >= 0;
}


exports.init = function () {
    extendType(Object.prototype, [
        checkContainsKeys,
        checkHasKeys,
        checkContainsValues,
        checkHasValues,
        checkHasValueType
    ]);
    extendType(Array.prototype, [checkHasLength]);
    extendType(String.prototype, [checkHasLength, checkHasWordsCount]);
    extendType(Function.prototype, [checkHasParamsCount]);
};


function checkContainsKeys(keys) {
    if (isInCorrectTypes(['array', 'object'], this))
        return keys.every(key => this.hasOwnProperty(key));
}

function checkHasKeys(keys) {
    if (isInCorrectTypes(['array', 'object'], this))
        return Object.keys(this).length == keys.length &&
            Object.keys(this).every(key => keys.indexOf(key) >= 0);
}

function checkContainsValues(values) {
    if (!isInCorrectTypes(['array', 'object'], this))
        return;
    var thisValues = Object
        .keys(this)
        .filter(k => this.hasOwnProperty(k))
        .map(key => this[key]);
    return values.every(v => thisValues.indexOf(v) >= 0);
}

function checkHasValues(values) {
    if (!isInCorrectTypes(['array', 'object'], this))
        return;
    var thisValues = Object.keys(this)
        .filter(key => this.hasOwnProperty(key))
        .map(key => this[key]);
    return values.length == thisValues.length &&
        thisValues.every(v => values.indexOf(v) >= 0);
}

function checkHasValueType(key, type) {
    if (!isInCorrectTypes(['array', 'object'], this))
        return;
    return this.hasOwnProperty(key) && this[key].__proto__ === type().__proto__;
}

function checkHasLength(length) {
    if (isInCorrectTypes(['array', 'string'], this))
        return this.length === length;
}

function checkHasParamsCount(count) {
    if (isInCorrectTypes(['function'], this))
        return this.length === count;
}

function checkHasWordsCount(count) {
    if (isInCorrectTypes(['string'], this))
        return this.split(' ').filter(w => w.length > 0).length === count;
}
