# React Native Hooks - usePersistStorage

Persist and rehydrate a **context store** by React Hooks

- An asynchronous persist storage
- Support **sensitive info** both on iOS & Android
- Migration function

[![npm version](https://badge.fury.io/js/react-native-use-persist-storage.svg)](https://badge.fury.io/js/react-native-use-persist-storage)

## Install

Install react-native-use-persist-storage

```
$ yarn add react-native-use-persist-storage
```

Install **@react-native-community/async-storage**, **react-native-sensitive-info**
(see [peerDependencies](https://github.com/visuallylab/react-native-use-persist-storage#peer-dependencies))

```
$ yarn add react-native-sensitive-info @react-native-community/async-storage
```

If RN < 0.60, link dependencies

```
$ react-native link react-native-sensitive-info
$ react-native link @react-native-community/async-storage
```

Note: For IOS project using pods, run: \$ cd ios/ && pod install

#### Peer Dependencies

**Note:** `react-native-use-persist-storage` requires the following peer dependencies:

- react >= 16.8.1
- react-native >= 0.59.0
- [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info)
- [@react-native-community/async-storage](https://github.com/react-native-community/react-native-async-storage)

---

## Usage

Make sure you know how [React Hooks](https://reactjs.org/docs/hooks-reference.html) works, and you can use it just same as useState.

#### Basic Usage

```js
// User.js
import { usePersistStorage } from "react-native-use-persist-storage";

const createDefaultUser = () => ({
  name: ""
});

const User = props => {
  const [user, setUser, restored] = usePersistStorage(
    "@User",
    createDefaultUser
  );
  if (restored) return <Text>loading...</Text>;
  return <Text>{user.name}</Text>;
};
```

#### Context Usage

If you want a light-weight global state management solution in react, try using [Context](https://reactjs.org/docs/context.html).

```js
// contexts/user.js
import { createContext } from 'react'
import { usePersistStorage } from 'react-native-use-persist-storage'

const createDefaultUser = () => ({
  name: '',
});

const UserContext = createContext(...);

const UserProvider = props => {
  const [user, setUser, restored] = usePersistStorage('@User', createDefaultUser);

  // anything you need...

  return (
    <UserContext.Provider value={
      { user, updateUser: setUser, restored }
      // or like this
      // [ user, updateUser: setUser, restored ]
    }>
      {props.children}
    </UserContext.Provider>
  );
};
```

```js
// GlobalStateProvider.ts
const GlobalStateProvider = ({ children }) => (
  <OtherContextProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </OtherContextProvider>
)

// App.js
const App = () => {
  return (
    <GlobalStateProvider>
      <Root />
    </GlobalStateProvider>
  );
};
```

#### Recommend use: [createPersistContext](#createPersistContext)

## API

#### `usePersistStorage(key, initialValue, options?)`

- arguments
  - `key`: async storage key
  - `initialValue`: initial value
  - `options`: set options `debug`, `persist`, `version`, `migrate`, `sensitive`.

##### `options` ([see](https://github.com/visuallylab/react-native-use-persist-storage/blob/master/src/defaultOptions.ts#L4))

- `debug`: call `console.debug` when any persist storage action.
  - default: `false`
- `persist`: set false, it will same as useState
  - default: `true`
- `version`: storage version, set with migrate function
  - default: `0`
- `migrate`: set migrate function, [see how to use createMigrate](#createMigrate)
  - default: `null`
- `sensitive`: if set true, it will use [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info) to store your data.
  - default: `false`

#### `createPersistContext`

It is a simple built-in util function for easy use. [See](https://github.com/visuallylab/react-native-use-persist-storage/blob/master/src/createPersistContext.tsx)

```js
// contexts/user.js
import { createPersistContext } from 'react-native-use-persist-storage';

export default createPersistContext({
  storageKey: '@User',
  defaultData: {
    name: 'Awesome!'
  },
  options: { ... }
});


// Component.js
import User from './contexts/user';

const Component = () => {
  const [user, setUser] = User.useData();
  return ...
};

```

**Or, you can create a hook to customize**

```js
// hooks/useUser.js
import User from './contexts/user';

const useUser = () => {
  const [user, setUser] = useContext(User.Context);
  const setName = () => ...
  const setEmail = () => ...
  return {
    user,
    setName,
    setEmail,
    setUser,
    // anything ...
  };
};

const Component = () => {
  const { user, ... } = useUser();
  ...
}

```

#### `createMigrate`

Use like [redux migration](https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md)

```js
import { createMigrate, usePersistStorage } from 'react-native-use-persist-storage';

const [user, setUser, restored] = usePersistStorage(
  '@User',
  defaultUser,
  {
    version: 2,
    migrate: createMigrate(
      {
        1: state => {
          // ...
        },
        2: state => ({
          // ...
        }),
        
      },
    ),
  },
)

```
