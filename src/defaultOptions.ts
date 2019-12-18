
import { UsePersistStorageOptions } from './usePersistStorage';

export let defaultOptions: UsePersistStorageOptions = {
  debug: false,
  version: 0,
  persist: true,
  migrate: null,

  // refer from https://github.com/mCodex/react-native-sensitive-info
  sensitive: false,
};

export type SetPersistStorageDefaultsParams = {
  debug?: boolean;
  persist?: boolean;
  version?: number;
}

export const setPersistStorageDefaults = (configs: SetPersistStorageDefaultsParams) => {
  defaultOptions = { ...defaultOptions, ...configs };
}