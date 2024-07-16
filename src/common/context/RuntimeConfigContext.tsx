import { createContext, FC, useMemo } from 'react';
import { RuntimeConfigInstance } from 'src/constants/runtime-config';
import { RuntimeConfig } from 'src/RuntimeConfig';

type RuntimeConfigContextValue = RuntimeConfig;
type Props = {
  children?: React.ReactNode;
};

export const RuntimeConfigContext = createContext<RuntimeConfigContextValue>(null!); // Internal nullability checked by hook

export const RuntimeConfigContextProvider: FC<Props> = ({ children }) => {
  const value = useMemo(() => RuntimeConfigInstance.value, []);

  return <RuntimeConfigContext.Provider value={value}>{children}</RuntimeConfigContext.Provider>;
};
