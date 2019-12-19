import React from "react";
import { UsePersistStorageOptions, AsyncSetState } from "./usePersistStorage";
export declare type PersistContext<T> = [T, AsyncSetState<T>, boolean];
declare const createPersistContext: <T extends {}>({ storageKey, defaultData, options }: {
    storageKey: string;
    defaultData: T;
    options?: UsePersistStorageOptions<T> | undefined;
}) => {
    Provider: React.FC<{
        persist?: boolean | undefined;
    }>;
    Context: React.Context<PersistContext<T>>;
    useData: () => PersistContext<T>;
};
export default createPersistContext;
