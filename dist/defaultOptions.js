"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = {
    debug: false,
    version: 0,
    persist: true,
    migrate: null,
    sensitive: false,
};
exports.setPersistStorageDefaults = function (configs) {
    exports.defaultOptions = __assign(__assign({}, exports.defaultOptions), configs);
};
