# React Native Hooks - usePersistStorage
Persist and rehydrate a **context store** by React Hooks

- an asynchronous persist storage
- can store sensitive info both on iOS & Android
- migration function

[![npm version](https://badge.fury.io/js/react-native-use-persist-storage.svg)](https://badge.fury.io/js/react-native-use-persist-storage)


## Usage
Install react-native-use-persist-storage
```
$ yarn add react-native-use-persist-storage
```

Install **@react-native-community/async-storage**, **react-native-sensitive-info**
(see [peerDependencies](https://github.com/visuallylab/react-native-use-persist-storage#peer-dependencies))

```
$ yarn add react-native-sensitive-info @react-native-community/async-storage
```

Link dependencies
```
$ react-native link react-native-sensitive-info 
$ react-native link @react-native-community/async-storage
```

Note: For IOS project using pods, run: $ cd ios/ && pod install


#### Peer Dependencies
**Note:** `react-native-use-persist-storage` requires the following peer dependencies:
- react >= 16.8.1
- react-native >= 0.59.0
- [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info)
- [@react-native-community/async-storage](https://github.com/react-native-community/react-native-async-storage)
