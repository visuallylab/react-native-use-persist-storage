import { PersistStorageValue } from "./usePersistStorage";

export function transformStorageValue<T>(
  value: T,
  version = 0
): PersistStorageValue<T> {
  return {
    _currentVersion: version,
    value
  };
}
