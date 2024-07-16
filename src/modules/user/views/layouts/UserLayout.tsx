import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useState } from 'react';
import * as UserApi from '@trainerhelper/users-api';
import { ProviderContext as SnackbarContext, useSnackbar } from 'notistack';
import { UserManagementsEnvironment } from '../../abstraction/UserManagementsEnvironment';
import { RuntimeConfig } from '../../../../RuntimeConfig';
import { AuthContextValue } from '../../../../context/Auth0Context';
import { useRuntimeConfig } from '../../../../hooks/useRuntimeConfig';
import useAuth from '../../../../hooks/useAuth';
import { LayoutRenderer } from '../../../../common/utils/nested-components';
import { UsersManagementsProvider } from '../../context/UsersManagementsContext';
import { createJwtAuthMiddleware } from '../../../../common/utils/api-client-helper';
import { UsersRoot } from '../../view-model/user-managment-root';
import { FullScreen, useFullScreenHandle } from 'src/common/hooks/full-screen';
import { AuthGuard } from 'src/common/guard/AuthGuard';
import { DashboardLayout } from 'src/layouts/DashboardLayout';
import RegisterUserPage from '../pages/registry';
import { UserManagementsModalsProvider } from '../../context/modals';
import { PlansLayout } from 'src/modules/plans/views/layouts/PlansLayout';

type Props = {
  children?: React.ReactNode;
};

function createEnv(runtimeConfig: RuntimeConfig, auth: AuthContextValue, snackbar: SnackbarContext): UserManagementsEnvironment {
  const configurationUserApi = new UserApi.Configuration({
    basePath: runtimeConfig.userApiBaseUrl,
    middleware: [createJwtAuthMiddleware(auth)],
  });
  return {
    apis: {
      groupApi: new UserApi.GroupsApi(configurationUserApi),
      userApi: new UserApi.UsersApi(configurationUserApi),
      permissionApi: new UserApi.PermissionsApi(configurationUserApi),
      roleApi: new UserApi.RolesApi(configurationUserApi),
    },
    snackbarContext: snackbar,
  };
}

export const UsersLayout: FC<Props> = observer(({ children }) => {
  const runtimeConfig = useRuntimeConfig();
  const auth = useAuth();
  const snackbar = useSnackbar();
  const fullscreenHandle = useFullScreenHandle();
  const env = createEnv(runtimeConfig, auth, snackbar);
  const root = useMemo(() => UsersRoot.create({}, env), []);

  useEffect(() => {
    root.fetchCheckUser();
  }, []);

  return (
    <AuthGuard>
      <FullScreen handle={fullscreenHandle}>
        <UserManagementsModalsProvider>
          <UsersManagementsProvider value={root}>
            {root.isLoginUsers ? <DashboardLayout>{children}</DashboardLayout> : <RegisterUserPage context={root} />}
          </UsersManagementsProvider>
        </UserManagementsModalsProvider>
      </FullScreen>
    </AuthGuard>
  );
});

export const UsersLayoutRenderer: LayoutRenderer = (page) => <PlansLayout><UsersLayout>{page}</UsersLayout></PlansLayout>;
