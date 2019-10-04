import React from "react";
import { TUsePersistStorageOptions } from "./usePersistStorage";
export declare type TPersistContext<T> = [T, React.Dispatch<React.SetStateAction<T>>, boolean];
declare const createPersistContext: <T extends {}>({ storageKey, defaultData, options }: {
    storageKey: string;
    defaultData: T;
    options?: TUsePersistStorageOptions<T> | undefined;
}) => {
    Provider: React.FunctionComponent<{
        persist?: boolean | undefined;
    }>;
    Context: React.Context<[T, React.Dispatch<React.SetStateAction<T>>, boolean]>;
    useData: () => [T, React.Dispatch<React.SetStateAction<T>>, boolean];
};
export default createPersistContext;
