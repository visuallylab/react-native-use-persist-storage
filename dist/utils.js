"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformStorageValue(value, version) {
    if (version === void 0) { version = 0; }
    return {
        _currentVersion: version,
        value: value
    };
}
exports.transformStorageValue = transformStorageValue;
