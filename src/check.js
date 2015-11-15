'use strict';

exports.init = function () {
    Object.prototype.checkContainsKeys = checkContainsKeys;
    Object.prototype.checkHasKeys = checkHasKeys;
    Object.prototype.checkContainsValues = checkContainsValues;
    Object.prototype.checkHasValues = checkHasValues;
    Object.prototype.checkHasValueType = checkHasValueType;
    Array.prototype.checkHasLength = checkHasLength;
    String.prototype.checkHasLength = checkHasLength;
    String.prototype.checkHasWordsCount = checkHasWordsCount;
    Function.prototype.checkHasParamsCount = checkHasParamsCount
};


function checkContainsKeys(keys) {
    return keys.every(key => this.hasOwnProperty(key))
}

function checkHasKeys(keys) {
    return Object.keys(this).length == keys.length &&
        Object.keys(this).every(key => keys.indexOf(key) >= 0);
}

function checkContainsValues(values) {
    var thisValues = Object
        .keys(this)
        .filter(k => this.hasOwnProperty(k))
        .map(key => this[key]);
    return values.every(v => thisValues.indexOf(v) >= 0);

}

function checkHasValues(values) {
    var thisValues = Object.keys(this)
        .filter(key => this.hasOwnProperty(key))
        .map(key => this[key]);
    return values.length == thisValues.length &&
        thisValues.every(v => values.indexOf(v) >= 0);
}

function checkHasValueType(key, type) {
    return this.hasOwnProperty(key) && this[key].__proto__ === type().__proto__
}

function checkHasLength(length) {
    return this.length === length;
}

function checkHasParamsCount(count) {
    return this.length === count;
}

function checkHasWordsCount(count) {
    return this.split(' ').filter(w => w.length > 0).length === count;
}