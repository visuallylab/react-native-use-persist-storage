/// <reference types="react" />
import { RNSensitiveInfoOptions } from 'react-native-sensitive-info';
import { TMigrationFuncParams } from './createMigrate';
export declare type TPersistStorageValue<Value> = {
    _currentVersion: number;
    value: Value;
};
export declare type TUsePersistStorageOptions<Value = any> = {
    debug?: boolean;
    version?: number;
    persist?: boolean;
    migrate?: ((params: TMigrationFuncParams) => TPersistStorageValue<Value>) | null;
    sensitive?: false | RNSensitiveInfoOptions;
};
declare const usePersistStorage: <Value>(key: string, initialValue: Value | (() => Value), { debug, version, persist, migrate, sensitive, }?: TUsePersistStorageOptions<Value>) => [Value, import("react").Dispatch<import("react").SetStateAction<Value>>, boolean];
export default usePersistStorage;
