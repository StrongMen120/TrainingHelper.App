import { flow, getEnv, Instance } from 'mobx-state-tree';
import { UserManagementsEnvironment as UserManagementsEnvironment } from 'src/modules/user/abstraction/UserManagementsEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import RoleCache from './role-cache';

export function createRoleRepositoryActions(context: Instance<typeof RoleCache>) {
  const env = getEnv<UserManagementsEnvironment>(context);
  return {
    fetchAllRoles: flow(function* (initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.roleApi.getAllRoles> = yield env.apis.roleApi.getAllRoles();
        return context.updateRoles(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while reads roles.', { variant: 'error' });
      }
    }),
  };
}

export type GroupRepository = ReturnType<typeof createRoleRepositoryActions>;
