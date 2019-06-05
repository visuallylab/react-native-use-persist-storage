import { TPersistStorageValue } from './index';
export declare type TMigrations = {
    [version: number]: (state: any) => any;
};
export declare type TMigrationFuncParams = {
    key: string;
    state: TPersistStorageValue<any>;
    version: number;
};
export declare type TCreateMigrateConfig = {
    debug?: boolean;
};
declare const createMigrate: <AfterValue>(migrations: TMigrations, configs?: TCreateMigrateConfig) => ({ key, state, version, }: TMigrationFuncParams) => TPersistStorageValue<AfterValue>;
export default createMigrate;
