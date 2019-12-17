import createAsyncStorage from "../src/createAsyncStorage";

const KEY = "@Test";
const { getItem, setItem, removeItem } = createAsyncStorage();

beforeAll(async () => {
  await removeItem(KEY);
})

afterAll(async () => {
  await removeItem(KEY);
})

test("test init getItem", async () => {
  let err;
  let data;
  const val = await getItem(KEY, (e, d) => {
    err = e;
    data = d;
  });
  expect(err).toBeNull();
  expect(data).toBeNull();
  expect(val).toBeNull();
});

test("test setItem", async () => {
  let err;
  let data;
  await setItem(KEY, "test", (e, d) => {
    err = e;
    data = d;
  });
  expect(err).toBeNull();
  expect(data).toBe('test');

  const val = await getItem(KEY);
  expect(val).toBe("test");
});

test("test removeItem", async () => {
  await removeItem(KEY);
  const val = await getItem(KEY);
  expect(val).toBeNull();
});
