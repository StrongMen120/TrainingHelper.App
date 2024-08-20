import React, { FC, useReducer, useEffect, createContext, useContext } from 'react';
import Keycloak from 'keycloak-js';
import PropTypes from 'prop-types';
import { User } from 'src/types/user';
import { useRuntimeConfig } from 'src/hooks/useRuntimeConfig';

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

let keyClockClient: Keycloak | null = null;

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: User;
  };
};
type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};
type LogoutAction = {
  type: ActionType.LOGOUT;
};
type Action = InitializeAction | LoginAction | LogoutAction;
interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

type Handler = (state: AuthState, action: any) => AuthState;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: AuthState, action: any): AuthState => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isInitialized: true,
      isAuthenticated,
      user,
    };
  },
  LOGIN: (state: AuthState, action: LoginAction): AuthState => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthState): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

export interface AuthContextValue extends AuthState {
  platform: 'KeyClock';
  logout: () => Promise<void>;
}
const reducer = (state: AuthState, action: Action): AuthState => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'KeyClock',
  logout: () => Promise.resolve(),
});

export const getUser = (keycloak: Keycloak): User => {
  const user: User = {
    id: keycloak.tokenParsed?.sub ?? '',
    email: keycloak.tokenParsed?.email ?? '',
    name: keycloak.tokenParsed?.name ?? '',
    getToken: keycloak.token ? () => keycloak!.updateToken(30).then(() => keycloak!.token ?? '') : undefined,
  };
  return user;
};
export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { authentication } = useRuntimeConfig();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        keyClockClient = new Keycloak({
          url: 'http://localhost:8080',
          realm: 'master',
          clientId: 'demo',
        });
        const isAuthenticated = await keyClockClient.init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        });
        if (isAuthenticated) {
          const user = getUser(keyClockClient);
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const logout = async (): Promise<void> => {
    await keyClockClient!.logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'KeyClock',
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const AuthConsumer = AuthContext.Consumer;
