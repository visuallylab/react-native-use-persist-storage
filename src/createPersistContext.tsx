import React from "react";
import usePersistStorage, {
  TUsePersistStorageOptions
} from "./usePersistStorage";

export type TPersistContext<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  boolean
];

const createPersistContext = <T extends {}>({
  storageKey,
  defaultData,
  options
}: {
  storageKey: string;
  defaultData: T;
  options?: TUsePersistStorageOptions<T>;
}) => {
  const createDefaultData = () => defaultData;

  const Context = React.createContext<TPersistContext<T>>([
    createDefaultData(), // state
    () => null, // update state function
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
        ...options,
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
