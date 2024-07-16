import { flow, getEnv, Instance } from 'mobx-state-tree';
import { UserManagementsEnvironment as UserManagementsEnvironment } from 'src/modules/user/abstraction/UserManagementsEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import GroupCache from './group-cache';
import { AddGroupCommandDto, AssignedGroupCommandDto, UpdateGroupCommandDto } from '@trainerhelper/users-api';

export function createGroupRepositoryActions(context: Instance<typeof GroupCache>) {
  const env = getEnv<UserManagementsEnvironment>(context);
  return {
    fetchAllGroups: flow(function* (initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.groupApi.getAllGroup> = yield env.apis.groupApi.getAllGroup();
        return context.updateGroups(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while reads groups.', { variant: 'error' });
      }
    }),
    fetchUpdateGroup: flow(function* (command: UpdateGroupCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingGroup(true);
        const dtos: AsyncReturnType<typeof env.apis.groupApi.updateGroup> = yield env.apis.groupApi.updateGroup(command);
        env.snackbarContext.enqueueSnackbar('Groups updated.', { variant: 'success' });
        return context.updateGroups([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while updated groups.', { variant: 'error' });
      }
    }),
    fetchCreateGroup: flow(function* (command: AddGroupCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingGroup(true);
        const dtos: AsyncReturnType<typeof env.apis.groupApi.createGroup> = yield env.apis.groupApi.createGroup(command);
        env.snackbarContext.enqueueSnackbar('Groups created.', { variant: 'success' });
        return context.updateGroups([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while created groups.', { variant: 'error' });
      }
    }),
    fetchDeleteGroup: flow(function* (groupId: number, initOverrides?: RequestInit) {
      try {
        context.setLoadingGroup(true);
        const dtos: AsyncReturnType<typeof env.apis.groupApi.deleteGroup> = yield env.apis.groupApi.deleteGroup(groupId);
        env.snackbarContext.enqueueSnackbar('Groups deleted.', { variant: 'success' });
        return context.updateGroups([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while deleted groups.', { variant: 'error' });
      }
    }),
    fetchAddMembersToGroup: flow(function* (command: AssignedGroupCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingGroup(true);
        const dtos: AsyncReturnType<typeof env.apis.groupApi.addToGroup> = yield env.apis.groupApi.addToGroup(command);
        env.snackbarContext.enqueueSnackbar('Members added to group.', { variant: 'success' });
        return context.updateGroups([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while created groups.', { variant: 'error' });
      }
    }),
    fetchRemoveMembersToGroup: flow(function* (command: AssignedGroupCommandDto, initOverrides?: RequestInit) {
      try {
        context.setLoadingGroup(true);
        const dtos: AsyncReturnType<typeof env.apis.groupApi.removeFromGroup> = yield env.apis.groupApi.removeFromGroup(command);
        env.snackbarContext.enqueueSnackbar('Members removed from group.', { variant: 'success' });
        return context.updateGroups([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while created groups.', { variant: 'error' });
      }
    }),
  };
}

export type GroupRepository = ReturnType<typeof createGroupRepositoryActions>;
