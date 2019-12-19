import { UsePersistStorageOptions } from './usePersistStorage';
export declare let defaultOptions: UsePersistStorageOptions;
export declare type SetPersistStorageDefaultsParams = {
    debug?: boolean;
    persist?: boolean;
    version?: number;
};
export declare const setPersistStorageDefaults: (configs: SetPersistStorageDefaultsParams) => void;
