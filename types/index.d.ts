import React from 'react';
import { RNSensitiveInfoOptions } from 'react-native-sensitive-info';
import { TMigrationFuncParams } from './createMigrate';
export * from './createMigrate';
export declare type TPersistStorageValue<Value> = {
    _currentVersion: number;
    value: Value;
};
export declare type TUsePersistStorageOptions<Value = any> = {
    version: number;
    persist?: boolean;
    migrate?: ((params: TMigrationFuncParams) => TPersistStorageValue<Value>) | null;
    sensitive?: false | RNSensitiveInfoOptions;
};
declare const usePersistStorage: <Value>(key: string, initialValue: Value | (() => Value), { version, persist, migrate, sensitive, }?: TUsePersistStorageOptions<Value>) => [Value, React.Dispatch<React.SetStateAction<Value>>, boolean];
export default usePersistStorage;
