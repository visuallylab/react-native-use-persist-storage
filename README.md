# React Native usePersistStorage
An asynchronous, unencrypted, persistent, key-value storage system for React Native.

## Usage
Install react-native-use-persist-storage
```
$ yarn add react-native-use-persist-storage
```

Install @react-native-community/async-storage, react-native-sensitive-info

```
$ yarn add react-native-sensitive-info @react-native-community/async-storage
```

Link dependencies
```
$ react-native link react-native-sensitive-info 
$ react-native link @react-native-community/async-storage
```

Note: For IOS project using pods, run: $ cd ios/ && pod install


## Peer Dependencies
**Note:** `react-native-use-persist-storage` requires the following peer dependencies:
- [@react-native-community/async-storage](https://github.com/react-native-community/react-native-async-storage)
- [react-native-sensitive-info](https://github.com/mCodex/react-native-sensitive-info)
- react
- react-native