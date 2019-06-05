import sensitiveInfo from 'react-native-sensitive-info';
declare type TValue = string | null;
declare type TCallback = (err: any, data: TValue | any[]) => void;
declare const createSensitiveStorage: (options?: sensitiveInfo.RNSensitiveInfoOptions) => {
    getItem(key: string, callback?: TCallback): Promise<string | null>;
    setItem(key: string, value: string, callback?: TCallback): Promise<void>;
    removeItem(key: string, callback?: TCallback): Promise<void>;
    getAllKeys(callback?: TCallback): Promise<any[]>;
};
export default createSensitiveStorage;
