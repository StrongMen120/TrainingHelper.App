import { Instance, types } from 'mobx-state-tree';
import { withIocPoolingUnsafe } from 'src/common/utils/mst-pool';
import GroupCache from './group-cache';
import { createGroupRepositoryActions } from './group-repository';
import { createRoleRepositoryActions } from './role-repository';
import RoleCache from './role-cache';
import UserCache from './user-cache';
import { createUserRepositoryActions } from './user-repository';
import GroupVM from './group';
import RoleVM from './role';
import UserVM from './user';

export const UsersRoot = types
  .compose('UserManagements', UserCache, GroupCache, RoleCache)
  .extend(withIocPoolingUnsafe({ type: UserCache }))
  .extend(withIocPoolingUnsafe({ type: GroupCache }))
  .extend(withIocPoolingUnsafe({ type: RoleCache }))
  .views((self) => ({
    get groupsCurrentUser() {
      const result: Instance<typeof GroupVM>[] = [];
      self.GroupsCache.forEach((v) => {
        if (self.currentUser?.groupsId.includes(v.id)) result.push(v);
      });
      return result;
    },
    get rolesCurrentUser() {
      const result: Instance<typeof RoleVM>[] = [];
      self.RolesCache.forEach((v) => {
        if (self.currentUser?.rolesId.includes(v.id)) result.push(v);
      });
      return result;
    },
    get membersCurrentGroup() {
      const result: Instance<typeof UserVM>[] = [];
      self.currentGroup?.members.forEach((v) => {
        result.push(self.getUserById(v.userId)!);
      });

      return result;
    },
    checkIsAdmin(): boolean {
      const user = self.loginUser;
      if(user) {
        return user.rolesId.includes(1);
      }
      return false;
    },
    checkIsTrainer(): boolean {
      const user = self.loginUser;
      if(user) {
        return user.rolesId.includes(2);
      }
      return false;
    }
  }))
  .actions((self) => createUserRepositoryActions(self))
  .actions((self) => createGroupRepositoryActions(self))
  .actions((self) => createRoleRepositoryActions(self))
  .actions((self) => ({
    selectedUserDetails(userId: number) {
      self.setSelectedUserId(userId as number);
    },
    selectedGroupDetails(groupId: number) {
      self.setSelectedGroupId(groupId as number);
    },
    createPermission(userId: number, roleId: number) {
      self.fetchCreatePermissions({ userId: userId, roleId: roleId });
    },
    deletePermission(userId: number, roleId: number) {
      self.fetchDeletePermissions(userId, roleId);
    },
  })
  );
