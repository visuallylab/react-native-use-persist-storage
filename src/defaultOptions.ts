
import { TUsePersistStorageOptions } from './index';

export let defaultOptions: TUsePersistStorageOptions = {
  debug: false,
  version: 0,
  persist: true,
  migrate: null,

  // refer from https://github.com/mCodex/react-native-sensitive-info
  sensitive: false,
};

export type TSetPersistStorageDefaultsParams = {
  debug?: boolean;
  persist?: boolean;
  version?: number;
}

export const setPersistStorageDefaults = (configs: TSetPersistStorageDefaultsParams) => {
  defaultOptions = { ...defaultOptions, ...configs };
}