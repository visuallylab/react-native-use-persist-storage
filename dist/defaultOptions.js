"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = {
    debug: false,
    version: 0,
    persist: true,
    migrate: null,
    sensitive: false,
};
exports.setPersistStorageDefaults = (configs) => {
    exports.defaultOptions = Object.assign({}, exports.defaultOptions, configs);
};
