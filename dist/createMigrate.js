"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMigrate = (migrations, configs = { debug: false }) => {
    return ({ key, state, version, }) => {
        const { debug } = configs;
        if (!state.value) {
            if (debug) {
                console.debug(`[${key}]: no inbound value, skipping migration`);
            }
            return state;
        }
        if (state._currentVersion === version) {
            if (debug) {
                console.debug(`[${key}]: version match, no migration`);
            }
            return state;
        }
        if (state._currentVersion > version) {
            console.warn(`[${key}]: downgrading version is not supported`);
            return state;
        }
        const migrationKeys = Object.keys(migrations)
            .map(v => parseInt(v, 10))
            .filter(ver => version >= ver && ver > state._currentVersion)
            .sort((a, b) => a - b);
        if (debug) {
            console.debug(`[${key}]: migration keys`, migrationKeys);
        }
        const migrated = migrationKeys.reduce(({ value }, versionKey) => {
            if (debug) {
                console.warn(`[${key}]: running migration ${versionKey}`);
            }
            return {
                _currentVersion: versionKey,
                value: migrations[versionKey](value),
            };
        }, state);
        return migrated;
    };
};
exports.default = createMigrate;
