"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions_1 = require("./defaultOptions");
var utils_1 = require("./utils");
var createMigrate = function (migrations, configs) {
    if (configs === void 0) { configs = { debug: defaultOptions_1.defaultOptions.debug }; }
    return function (_a) {
        var key = _a.key, state = _a.state, version = _a.version;
        var debug = configs.debug;
        if (!state.value) {
            if (debug) {
                console.debug("[" + key + "]: no inbound value, skipping migration");
            }
            return state;
        }
        if (state._currentVersion === version) {
            if (debug) {
                console.debug("[" + key + "]: version match, no migration");
            }
            return state;
        }
        if (state._currentVersion > version) {
            console.warn("[" + key + "]: downgrading version is not supported");
            return state;
        }
        var migrationKeys = Object.keys(migrations)
            .map(function (v) { return parseInt(v, 10); })
            .filter(function (ver) { return version >= ver && ver > state._currentVersion; })
            .sort(function (a, b) { return a - b; });
        if (debug) {
            console.debug("[" + key + "]: migration keys", migrationKeys);
        }
        var migrated = migrationKeys.reduce(function (_a, versionKey) {
            var value = _a.value;
            if (debug) {
                console.warn("[" + key + "]: running migration " + versionKey);
            }
            return utils_1.transformStorageValue(migrations[versionKey](value), versionKey);
        }, state);
        return migrated;
    };
};
exports.default = createMigrate;
