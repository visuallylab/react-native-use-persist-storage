import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { RNSensitiveInfoOptions } from "react-native-sensitive-info";

import { TMigrationFuncParams } from "./createMigrate";
import createAsyncStorage from "./createAsyncStorage";
import createSensitiveStorage from "./createSensitiveStorage";
import { defaultOptions } from "./defaultOptions";
import { transformStorageValue } from "./utils";

export interface PersistStorageValue<Value> {
  _currentVersion: number;
  value: Value;
}

export type UsePersistStorageOptions<Value = any> = {
  debug?: boolean;
  version?: number;
  persist?: boolean;
  migrate?:
    | ((params: TMigrationFuncParams) => PersistStorageValue<Value>)
    | null;
  sensitive?: false | RNSensitiveInfoOptions;
};

type CallbackFn<S> = (prev: S) => S;
export type AsyncSetState<S = any> = (
  stateOrCallbackFn: S | CallbackFn<S>
) => Promise<void>;

/**
 * usePersistStorage will return state that'll be consistent with your storage.
 * support migration and storing sensitive info
 * @param key the key stored in localStorage
 * @param initialValue defaultValue
 * @param options
 */
const usePersistStorage = <Value>(
  key: string,
  initialValue: Value | (() => Value),
  {
    debug = defaultOptions.debug,
    version = defaultOptions.version,
    persist = defaultOptions.persist,
    migrate = defaultOptions.migrate,
    sensitive = defaultOptions.sensitive
  }: UsePersistStorageOptions<Value> = defaultOptions
): [Value, AsyncSetState<Value>, boolean] => {
  const currentVersion = useRef<number>(version || 0);
  const [state, setState] = useState<Value>(initialValue);
  const [restored, setRestored] = useState<boolean>(false);

  const Storage = useMemo(
    () =>
      sensitive ? createSensitiveStorage(sensitive) : createAsyncStorage(),
    [sensitive]
  );

  const logPrefix = sensitive ? "(sensitive)" : "";

  const setValueToStorage = useCallback(
    async (newValue: Value) => {
      const value = transformStorageValue<Value>(
        newValue,
        currentVersion.current
      );
      try {
        const serializedValue = JSON.stringify(value);
        await Storage.setItem(key, serializedValue);
        if (debug) {
          console.debug(`${logPrefix}[PersistStorage]: set ${key}: `, value);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [Storage]
  );

  useEffect(() => {
    if (persist) {
      // Restore from storage when first mount.
      const restoreStateFromStorage = async () => {
        try {
          const storageValue = await Storage.getItem(key);
          if (storageValue) {
            let parsedValue = JSON.parse(storageValue || "null");

            // format if value is incorrect
            if (parsedValue && parsedValue._currentVersion === undefined) {
              parsedValue = transformStorageValue(
                parsedValue,
                currentVersion.current
              );
            }

            if (migrate) {
              parsedValue = migrate({
                key,
                state: parsedValue,
                version: currentVersion.current
              });
              currentVersion.current = parsedValue._currentVersion;
              await setValueToStorage(parsedValue.value);
            }

            setState(parsedValue.value);
            if (debug) {
              console.debug(
                `${logPrefix}[PersistStorage]: restore ${key}: `,
                parsedValue
              );
            }
          } else {
            // If storage has no value, set initial value to storage
            await setValueToStorage(state);
          }
        } catch (err) {
          console.error(err);
        }

        setRestored(true);
      };

      restoreStateFromStorage();
    } else {
      // If disable persist, remove storageValue.
      const removePersistItem = async () => {
        await Storage.removeItem(key);
        setRestored(true);
      };

      removePersistItem();
      if (debug) {
        console.debug(`${logPrefix}[PersistStorage]: remove ${key}`);
      }
    }
  }, []);

  const asyncSetState: AsyncSetState<Value> = async stateOrCallbackFn => {
    const newValue: Value =
      stateOrCallbackFn instanceof Function
        ? stateOrCallbackFn(state)
        : stateOrCallbackFn;

    setState(newValue);
    if (persist) {
      await setValueToStorage(newValue);
    }
  };

  return [state, asyncSetState, restored];
};

export default usePersistStorage;
