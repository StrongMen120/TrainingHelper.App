import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Auth0Client } from '@auth0/auth0-spa-js';
import type { User } from '../types/user';
import { isNil } from 'lodash';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';

const UNKNOWN_USER: User = {
  id: 'unknown_user_id',
  avatar: undefined,
  email: '',
  name: '<<unknown>>',
  roles: [],
  permissions: [],
  getToken: undefined,
};

const ERROR_USER: User = {
  id: 'error_user_sub',
  avatar: undefined,
  email: 'error_user_email',
  name: 'error_user_name',
  roles: [],
  permissions: [],
  getToken: undefined,
};

let auth0Client: Auth0Client | null = null;

type AppState = {
  returnUrl?: string;
};

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextValue extends State {
  platform: 'Auth0';
  loginWithRedirect: (appState?: AppState) => Promise<void>;
  loginWithPopup: (appState?: AppState) => Promise<void>;
  handleRedirectCallback: () => Promise<AppState | undefined>;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Auth0',
  loginWithRedirect: () => Promise.resolve(),
  loginWithPopup: () => Promise.resolve(),
  handleRedirectCallback: () => Promise.resolve(undefined),
  checkSession: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

async function getUserData(auth0Client: Auth0Client, auth0User?: User | undefined): Promise<User> {
  auth0User = auth0User ?? (await auth0Client.getUser());
  const client = auth0Client;
  const getToken = async () => (await client.getTokenSilently()) as string;

  // Here you should extract the complete user profile to make it
  // available in your entire app.
  // The auth state only provides basic information.
  return isNil(auth0User)
    ? UNKNOWN_USER
    : {
        id: auth0User.sub ?? ERROR_USER.id,
        avatar: auth0User.picture ?? ERROR_USER.avatar,
        email: auth0User.email ?? ERROR_USER.email,
        roles: auth0User.roles ?? ERROR_USER.roles,
        permissions: auth0User.permissions ?? ERROR_USER.permissions,
        name: auth0User.name ?? ERROR_USER.name,
        plan: 'Premium',
        getToken: getToken ?? ERROR_USER.getToken,
      };
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { authentication } = useRuntimeConfig();
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        auth0Client = new Auth0Client({
          redirect_uri: window.location.origin + '/authentication/authorize',
          domain: authentication.domain!,
          client_id: authentication.clientId!,
          audience: authentication.audience,
          cacheLocation: 'localstorage',
        });
        await auth0Client.checkSession();
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (isAuthenticated) {
          const user = await getUserData(auth0Client);
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated,
              user,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated,
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

  const loginWithRedirect = async (appState?: AppState): Promise<void> => {
    await auth0Client!.loginWithRedirect({
      appState,
    });
  };

  const loginWithPopup = async (appState?: AppState): Promise<void> => {
    await auth0Client!.loginWithPopup({
      appState,
    });
  };

  const checkSession = async (): Promise<void> => {
    await auth0Client!.checkSession();
  };

  const handleRedirectCallback = async (): Promise<AppState | undefined> => {
    const result = await auth0Client!.handleRedirectCallback();
    const user = await getUserData(auth0Client!);
    // Here you should extract the complete user profile to make it available in your entire app.
    // The auth state only provides basic information.

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user,
      },
    });

    return result.appState;
  };

  const logout = async (): Promise<void> => {
    await auth0Client!.logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Auth0',
        loginWithRedirect,
        loginWithPopup,
        handleRedirectCallback,
        checkSession,
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
