import { Context, createContext, useContext } from 'react';

export function createProtectedUseContext<TContextValue>(context: Context<TContextValue>, nullErrorMessage: string) {
  return (): TContextValue => {
    const contextValue = useContext(context);

    if (contextValue === null) throw new Error(nullErrorMessage);

    return contextValue;
  };
}

export function createUnsafeContext<TContextValue>(
  name: string,
  options: { nullErrorMessage?: string; defaultContextValue?: TContextValue } = {}
): [Context<TContextValue>, () => TContextValue] {
  const contextInstance = createContext<TContextValue | null>(null) as Context<TContextValue>;
  const protectedUseContext = createProtectedUseContext(contextInstance, options.nullErrorMessage ?? `${name} is not initialized!`);
  return [contextInstance, protectedUseContext];
}
