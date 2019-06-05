import { TUsePersistStorageOptions } from './index';
export declare let defaultOptions: TUsePersistStorageOptions;
export declare type TSetPersistStorageDefaultsParams = {
    debug?: boolean;
    persist?: boolean;
    version?: number;
};
export declare const setPersistStorageDefaults: (configs: TSetPersistStorageDefaultsParams) => void;
