import { UserDto } from '@trainerhelper/users-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import UserVM from './user';

function createUserVM(dto: UserDto): SnapshotIn<typeof UserVM> {
  return { id: dto.identifier, dto };
}
const UserCache = types
  .model({
    UsersCache: types.map(UserVM),
  })
  .volatile((self) => ({
    isLoadingUsers: true,
    isLoginUsers: false,
    loginUserId: 0,
    selectedUserId: 0,
  }))
  .views((self) => ({
    get users() {
      return [...self.UsersCache.values()].sort((p) => p.id);
    },
    get trainers() {
      return [...self.UsersCache.values()].filter((p) => p.rolesId.includes(2));
    },
    get currentUser() {
      return this.getUserById(self.selectedUserId);
    },
    getUserById(id: string | number) {
     return self.UsersCache.get(id.toString());
    }, 
    get loginUser() {
      return this.getUserById(self.loginUserId);
    },
    selectedUserIsAdmin(): boolean {
      const user = this.currentUser;
      if(user) {
         return user.rolesId.includes(1);
      }
      return false;
    }, 
    selectedUserIsTrainer(): boolean {
      const user = this.currentUser;
      if(user) {
        return user.rolesId.includes(2);
      }
     return false;
    }, 
  }))
  .actions((self) => ({
    updateUsers(dtos: UserDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateUsers(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createUserVM, (d, m) => m.id);
      self.UsersCache.merge(update);
      self.isLoadingUsers = false;
    },
    setLoginUser(value: boolean) {
      self.isLoginUsers = value;
    },
    setLoadingUser(value: boolean) {
      self.isLoadingUsers = value;
    },
    setSelectedUserId(value: number) {
      self.selectedUserId = Number(value);
    },
    setLoginUserId(value: number) {
      self.loginUserId = Number(value);
    },
  }));

export default UserCache;
