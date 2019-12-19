import { PersistStorageValue } from "./usePersistStorage";
export declare type TMigrations = {
    [version: number]: (state: any) => any;
};
export declare type TMigrationFuncParams = {
    key: string;
    state: PersistStorageValue<any>;
    version: number;
};
export declare type TCreateMigrateConfig = {
    debug?: boolean;
};
declare const createMigrate: <AfterValue>(migrations: TMigrations, configs?: TCreateMigrateConfig) => ({ key, state, version }: TMigrationFuncParams) => PersistStorageValue<AfterValue>;
export default createMigrate;
