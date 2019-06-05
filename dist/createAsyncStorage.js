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
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const noop = () => null;
const createAsyncStorage = () => {
    return {
        getItem(key, callback = noop) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield async_storage_1.default.getItem(key);
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
                    yield async_storage_1.default.setItem(key, value);
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
                    yield async_storage_1.default.removeItem(key);
                    callback(null, null);
                }
                catch (error) {
                    callback(error, null);
                    throw error;
                }
            });
        },
    };
};
exports.default = createAsyncStorage;
