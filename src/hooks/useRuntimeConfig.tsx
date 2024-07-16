import { useContext } from 'react';
import { RuntimeConfigContext } from 'src/common/context/RuntimeConfigContext';

export function useRuntimeConfig() {
  const store = useContext(RuntimeConfigContext);

  if (store === null) {
    throw new Error('RuntimeConfig cannot be null, please add a context  provider');
  }

  return store;
}
