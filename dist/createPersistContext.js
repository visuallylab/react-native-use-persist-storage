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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var usePersistStorage_1 = __importDefault(require("./usePersistStorage"));
var createPersistContext = function (_a) {
    var storageKey = _a.storageKey, defaultData = _a.defaultData, options = _a.options;
    var createDefaultData = function () { return defaultData; };
    var Context = react_1.default.createContext([
        createDefaultData(),
        function () { return null; },
        false
    ]);
    var Provider = function (props) {
        var _a = usePersistStorage_1.default(storageKey, createDefaultData, __assign({ persist: props.persist }, options)), data = _a[0], setData = _a[1], restored = _a[2];
        return (react_1.default.createElement(Context.Provider, { value: [data, setData, restored] }, props.children));
    };
    var useData = function () {
        var context = react_1.default.useContext(Context);
        if (!context) {
            throw new Error("Context error: context [" + storageKey + "] must be used within a Provider");
        }
        return context;
    };
    return {
        Provider: Provider,
        Context: Context,
        useData: useData
    };
};
exports.default = createPersistContext;
