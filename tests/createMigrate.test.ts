import { renderHook, act } from "@testing-library/react-hooks";
import usePersistStorage from "../src/usePersistStorage";
import createAsyncStorage from "../src/createAsyncStorage";
import createMigrate from "../src/createMigrate";
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

beforeAll(async () => {
  await store.removeItem(KEY);
});

afterAll(async () => {
  await store.removeItem(KEY);
});

test("version 0", async () => {
  const { result } = renderHook(
    props => usePersistStorage(KEY, "test", props),
    {
      initialProps: { version: 0, migrate: undefined }
    }
  );

  expect(result.current[0]).toBe("test");
  expect(typeof result.current[1]).toBe("function");

  // wait update asyncStorage;
  await sleep(100);
  expect(await store.getItem(KEY)).toBe(transformStorageValue("test", 0));
});

test("restore & migrate version 1", async () => {
  const { result } = renderHook(
    props => usePersistStorage(KEY, "test", props),
    {
      initialProps: {
        version: 1,
        migrate: createMigrate({
          1: state => state + " migrate!"
        })
      }
    }
  );

  // wait restore and migrate asyncStorage;
  await sleep(300);
  expect(result.current[0]).toBe("test migrate!");
  expect(typeof result.current[1]).toBe("function");
  expect(await store.getItem(KEY)).toBe(
    transformStorageValue("test migrate!", 1)
  );
});
