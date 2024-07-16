import { ProviderContext as SnackbarContext } from 'notistack';
import * as UsersApi from '@trainerhelper/users-api';

export interface UserManagementsEnvironment {
  apis: Readonly<EnvironmentApis>;
  snackbarContext: SnackbarContext;
}
interface EnvironmentApis {
  userApi: UsersApi.UsersApi;
  groupApi: UsersApi.GroupsApi;
  roleApi: UsersApi.RolesApi;
  permissionApi: UsersApi.PermissionsApi;
}
