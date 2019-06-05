import React, { useState, useEffect, useRef, useMemo } from 'react';
import { RNSensitiveInfoOptions } from 'react-native-sensitive-info';

import { TMigrationFuncParams } from './createMigrate';
import createAsyncStorage from './createAsyncStorage';
import createSensitiveStorage from './createSensitiveStorage';

// export createMigrate from index
export { default as createMigrate } from './createMigrate';

export type TPersistStorageValue<Value> = {
  _currentVersion: number;
  value: Value;
};

export type TUsePersistStorageOptions<Value = any> = {
  version: number;
  persist?: boolean;
  migrate?: ((params: TMigrationFuncParams) => TPersistStorageValue<Value>) | null;
  sensitive?: false | RNSensitiveInfoOptions;
};

const defaultOptions: TUsePersistStorageOptions = {
  version: 0,
  persist: true,
  migrate: null,

  // refer from https://github.com/mCodex/react-native-sensitive-info
  sensitive: false,
};

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
    version = defaultOptions.version,
    persist = defaultOptions.persist,
    migrate = defaultOptions.migrate,
    sensitive = defaultOptions.sensitive,
  }: TUsePersistStorageOptions<Value> = defaultOptions,
): [Value, React.Dispatch<React.SetStateAction<Value>>, boolean] => {
  const isMounted = useRef<boolean>(false);
  const currentVersion = useRef<number>(version);
  const [state, setState] = useState<Value>(initialValue);
  const [restored, setRestored] = useState<boolean>(false);

  const Storage = useMemo(
    () =>
      sensitive
        ? createSensitiveStorage(sensitive)
        : createAsyncStorage(),
    ['unchange'],
  );

  const logPrefix = sensitive ? '(sensitive)' : '';

  useEffect(() => {
    if (persist) {
      const setStateToStorage = async (forceValue?: TPersistStorageValue<Value>) => {
        const value = forceValue || {
          _currentVersion: currentVersion.current,
          value: state,
        };
        try {
          const serializedValue = JSON.stringify(value);
          await Storage.setItem(key, serializedValue);
          console.debug(`${logPrefix}[PersistStorage]: set ${key}: `, value);
        } catch (err) {
          console.error(err);
        }
      };

      const restoreStateFromStorage = async () => {
        try {
          const storageValue = await Storage.getItem(key);
          if (storageValue) {
            let parsedValue = JSON.parse(storageValue || 'null');
            if (parsedValue && parsedValue._currentVersion === undefined) {
              // init the version and format
              parsedValue = {
                _currentVersion: 0,
                value: parsedValue,
              };
            }

            if (migrate) {
              parsedValue = migrate({
                key,
                state: parsedValue,
                version: currentVersion.current,
              });
              await setStateToStorage(parsedValue);
              currentVersion.current = parsedValue._currentVersion;
            }
            setState(parsedValue.value);
            console.debug(
              `${logPrefix}[PersistStorage]: restore ${key}: `,
              parsedValue,
            );
          } else {
            // If storage has no value, set initial value to storage
            setStateToStorage();
          }
        } catch (err) {
          console.error(err);
        }
        setRestored(true);
      };

      if (!isMounted.current) {
        // Restore from storage when first mount.
        restoreStateFromStorage();
        isMounted.current = true;
      } else {
        // Be consistent with storage when update.
        setStateToStorage();
      }
    } else {
      // If disable persist,
      // remove storageValue when mounted.
      Storage.removeItem(key);
      setRestored(true);
      console.debug(`${logPrefix}[PersistStorage]: remove ${key}`);
    }
  }, [state]);

  return [state, setState, restored];
};

export default usePersistStorage;
