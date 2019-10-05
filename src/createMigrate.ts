import { defaultOptions } from './defaultOptions';
import { TPersistStorageValue } from './index';

export type TMigrations = {
  [version: number]: (state: any) => any;
};

export type TMigrationFuncParams = {
  key: string;
  state: TPersistStorageValue<any>;
  version: number;
};

export type TCreateMigrateConfig = {
  debug?: boolean;
};

const createMigrate = <AfterValue>(
  migrations: TMigrations,
  configs: TCreateMigrateConfig = { debug: defaultOptions.debug },
) => {
  return ({
    key,
    state,
    version,
  }: TMigrationFuncParams): TPersistStorageValue<AfterValue> => {
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

export default createMigrate;
