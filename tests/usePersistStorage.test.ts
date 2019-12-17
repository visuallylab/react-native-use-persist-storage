import { renderHook, act } from "@testing-library/react-hooks";
import usePersistStorage from "../src/usePersistStorage";
import createAsyncStorage from "../src/createAsyncStorage";
import { sleep } from "./utils";

// <value type>
// {
//   _currentVersion: number;
//   value: Value;
// };
const transformStorageValue = (value: any, version = 0) =>
  JSON.stringify({
    _currentVersion: version,
    value
  });

const KEY = "@TEST";
const store = createAsyncStorage();

beforeEach(async () => {
  await store.removeItem(KEY);
});

afterEach(async () => {
  await store.removeItem(KEY);
});

test("[persist] init, setState, version = 1", async () => {
  const { result } = renderHook(() =>
    usePersistStorage(KEY, "test", { version: 1 })
  );

  expect(result.current[0]).toBe("test");
  expect(typeof result.current[1]).toBe("function");

  // wait update asyncStorage;
  await sleep(100);
  expect(await store.getItem(KEY)).toBe(transformStorageValue("test", 1));

  act(() => {
    result.current[1]("change");
  });

  expect(result.current[0]).toBe("change");

  await sleep(100); // wait update asyncStorage;
  expect(await store.getItem(KEY)).toBe(transformStorageValue("change", 1));
});

test("no persist state", async () => {
  const { result } = renderHook(() =>
    usePersistStorage(KEY, "no persist", { persist: false })
  );

  expect(result.current[0]).toBe("no persist");
  expect(typeof result.current[1]).toBe("function");
  expect(await store.getItem(KEY)).toBeNull();

  act(() => {
    result.current[1]("change");
  });

  expect(result.current[0]).toBe("change");
  
  await sleep(100); // wait update asyncStorage;
  expect(await store.getItem(KEY)).toBeNull();
});
