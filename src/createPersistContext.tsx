import React from "react";
import usePersistStorage, {
  UsePersistStorageOptions,
  AsyncSetState
} from "./usePersistStorage";

export type PersistContext<T> = [
  T,
  AsyncSetState<T>,
  boolean
];

const createPersistContext = <T extends {}>({
  storageKey,
  defaultData,
  options
}: {
  storageKey: string;
  defaultData: T;
  options?: UsePersistStorageOptions<T>;
}) => {
  const createDefaultData = () => defaultData;

  const Context = React.createContext<PersistContext<T>>([
    createDefaultData(), // state
    async () => {;}, // update state function
    false // restored
  ]);

  const Provider: React.FC<{
    persist?: boolean;
  }> = props => {
    const [data, setData, restored] = usePersistStorage<T>(
      storageKey,
      createDefaultData,
      {
        persist: props.persist,
        ...options
      }
    );

    return (
      <Context.Provider value={[data, setData, restored]}>
        {props.children}
      </Context.Provider>
    );
  };

  const useData = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(
        `Context error: context [${storageKey}] must be used within a Provider`
      );
    }
    return context;
  };

  return {
    Provider,
    Context,
    useData
  };
};

export default createPersistContext;
