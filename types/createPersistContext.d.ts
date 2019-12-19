import React from "react";
import { UsePersistStorageOptions } from "./usePersistStorage";
export declare type PersistContext<T> = [T, React.Dispatch<React.SetStateAction<T>>, boolean];
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
