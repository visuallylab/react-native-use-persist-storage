"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_sensitive_info_1 = __importDefault(require("react-native-sensitive-info"));
const extractKeys = react_native_1.Platform.select({
    ios: (items) => items[0].map(item => item.key),
    android: Object.keys,
});
const noop = () => null;
const createSensitiveStorage = (sensitiveOpts = {}) => {
    return {
        getItem(key, callback = noop) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let result = yield react_native_sensitive_info_1.default.getItem(key, sensitiveOpts);
                    if (typeof result === 'undefined') {
                        result = null;
                    }
                    callback(null, result);
                    return result;
                }
                catch (error) {
                    callback(error, null);
                    throw error;
                }
            });
        },
        setItem(key, value, callback = noop) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield react_native_sensitive_info_1.default.setItem(key, value, sensitiveOpts);
                    callback(null, value);
                }
                catch (error) {
                    callback(error, null);
                    throw error;
                }
            });
        },
        removeItem(key, callback = noop) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield react_native_sensitive_info_1.default.deleteItem(key, sensitiveOpts);
                    callback(null, null);
                }
                catch (error) {
                    callback(error, null);
                    throw error;
                }
            });
        },
        getAllKeys(callback = noop) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const values = (yield react_native_sensitive_info_1.default.getAllItems(sensitiveOpts));
                    const result = extractKeys(values);
                    callback(null, result);
                    return result;
                }
                catch (error) {
                    callback(error, null);
                    throw error;
                }
            });
        },
    };
};
exports.default = createSensitiveStorage;
