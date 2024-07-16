import { flow, getEnv, Instance } from 'mobx-state-tree';
import { UserManagementsEnvironment } from 'src/modules/user/abstraction/UserManagementsEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import UserCache from './user-cache';
import { AddPermissionCommandDto, AddUserCommandDto, UpdateUserCommandDto } from '@trainerhelper/users-api';

export function createUserRepositoryActions(context: Instance<typeof UserCache>) {
  const env = getEnv<UserManagementsEnvironment>(context);
  return {
    fetchAllUsers: flow(function* (initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.userApi.getAllUser> = yield env.apis.userApi.getAllUser();
        return context.updateUsers(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while reads users.', { variant: 'error' });
      }
    }),
    fetchCreateUser: flow(function* (newUser: AddUserCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingUser(true);
        const dto: AsyncReturnType<typeof env.apis.userApi.createUser> = yield env.apis.userApi.createUser(newUser);
        env.snackbarContext.enqueueSnackbar('User created', {
          variant: 'success',
        });
        context.setLoadingUser(false);
        context.setLoginUser(true);
        context.updateUsers([dto]);
      } catch (error) {
        context.setLoadingUser(false);
        env.snackbarContext.enqueueSnackbar('Something went wrong', {
          variant: 'error',
        });
      }
    }),
    fetchUpdateUser: flow(function* (updatedUser: UpdateUserCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingUser(true);
        const dto: AsyncReturnType<typeof env.apis.userApi.updateUser> = yield env.apis.userApi.updateUser(updatedUser);
        env.snackbarContext.enqueueSnackbar('User updated', {
          variant: 'success',
        });
        context.setLoadingUser(false);
        context.updateUsers([dto]);
      } catch (error) {
        context.setLoadingUser(false);
        env.snackbarContext.enqueueSnackbar('Something went wrong', {
          variant: 'error',
        });
      }
    }),
    fetchCheckUser: flow(function* (initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.userApi.checkUser> = yield env.apis.userApi.checkUser();
        context.setLoginUser(true);
        context.setLoginUserId(dto.identifier);
        return context.updateUsers([dto]);
      } catch {
        context.setLoginUser(false);
        env.snackbarContext.enqueueSnackbar('An error while check user.', { variant: 'error' });
      }
    }),
    fetchDeletePermissions: flow(function* (userId: number, roleId: number, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.permissionApi.deletePermission> = yield env.apis.permissionApi.deletePermission(userId, roleId);
        context.updateUsers([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while delete permission.', { variant: 'error' });
      }
    }),
    fetchCreatePermissions: flow(function* (command: AddPermissionCommandDto, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.permissionApi.createPermission> = yield env.apis.permissionApi.createPermission(command);
        context.updateUsers([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while create permission.', { variant: 'error' });
      }
    }),
  };
}

export type UserRepository = ReturnType<typeof createUserRepositoryActions>;
