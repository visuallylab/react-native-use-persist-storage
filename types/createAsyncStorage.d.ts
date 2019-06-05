declare type TValue = string | null;
declare type TCallback = (err: any, data: TValue | any[]) => void;
declare const createAsyncStorage: () => {
    getItem(key: string, callback?: TCallback): Promise<TValue>;
    setItem(key: string, value: string, callback?: TCallback): Promise<void>;
    removeItem(key: string, callback?: TCallback): Promise<void>;
};
export default createAsyncStorage;
