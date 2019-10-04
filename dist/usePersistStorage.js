"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var createAsyncStorage_1 = __importDefault(require("./createAsyncStorage"));
var createSensitiveStorage_1 = __importDefault(require("./createSensitiveStorage"));
var defaultOptions_1 = require("./defaultOptions");
var usePersistStorage = function (key, initialValue, _a) {
    var _b = _a === void 0 ? defaultOptions_1.defaultOptions : _a, _c = _b.debug, debug = _c === void 0 ? defaultOptions_1.defaultOptions.debug : _c, _d = _b.version, version = _d === void 0 ? defaultOptions_1.defaultOptions.version : _d, _e = _b.persist, persist = _e === void 0 ? defaultOptions_1.defaultOptions.persist : _e, _f = _b.migrate, migrate = _f === void 0 ? defaultOptions_1.defaultOptions.migrate : _f, _g = _b.sensitive, sensitive = _g === void 0 ? defaultOptions_1.defaultOptions.sensitive : _g;
    var isMounted = react_1.useRef(false);
    var currentVersion = react_1.useRef(version || 0);
    var _h = react_1.useState(initialValue), state = _h[0], setState = _h[1];
    var _j = react_1.useState(false), restored = _j[0], setRestored = _j[1];
    var Storage = react_1.useMemo(function () {
        return sensitive ? createSensitiveStorage_1.default(sensitive) : createAsyncStorage_1.default();
    }, ['unchange']);
    var logPrefix = sensitive ? '(sensitive)' : '';
    react_1.useEffect(function () {
        if (persist) {
            var setStateToStorage_1 = function (forceValue) { return __awaiter(void 0, void 0, void 0, function () {
                var value, serializedValue, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = forceValue || {
                                _currentVersion: currentVersion.current,
                                value: state,
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            serializedValue = JSON.stringify(value);
                            return [4, Storage.setItem(key, serializedValue)];
                        case 2:
                            _a.sent();
                            if (debug) {
                                console.debug(logPrefix + "[PersistStorage]: set " + key + ": ", value);
                            }
                            return [3, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            }); };
            var restoreStateFromStorage = function () { return __awaiter(void 0, void 0, void 0, function () {
                var storageValue, parsedValue, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4, Storage.getItem(key)];
                        case 1:
                            storageValue = _a.sent();
                            if (!storageValue) return [3, 4];
                            parsedValue = JSON.parse(storageValue || 'null');
                            if (parsedValue && parsedValue._currentVersion === undefined) {
                                parsedValue = {
                                    _currentVersion: 0,
                                    value: parsedValue,
                                };
                            }
                            if (!migrate) return [3, 3];
                            parsedValue = migrate({
                                key: key,
                                state: parsedValue,
                                version: currentVersion.current,
                            });
                            return [4, setStateToStorage_1(parsedValue)];
                        case 2:
                            _a.sent();
                            currentVersion.current = parsedValue._currentVersion;
                            _a.label = 3;
                        case 3:
                            setState(parsedValue.value);
                            if (debug) {
                                console.debug(logPrefix + "[PersistStorage]: restore " + key + ": ", parsedValue);
                            }
                            return [3, 5];
                        case 4:
                            setStateToStorage_1();
                            _a.label = 5;
                        case 5: return [3, 7];
                        case 6:
                            err_2 = _a.sent();
                            console.error(err_2);
                            return [3, 7];
                        case 7:
                            setRestored(true);
                            return [2];
                    }
                });
            }); };
            if (!isMounted.current) {
                restoreStateFromStorage();
                isMounted.current = true;
            }
            else {
                setStateToStorage_1();
            }
        }
        else {
            Storage.removeItem(key);
            setRestored(true);
            if (debug) {
                console.debug(logPrefix + "[PersistStorage]: remove " + key);
            }
        }
    }, [state]);
    return [state, setState, restored];
};
exports.default = usePersistStorage;
