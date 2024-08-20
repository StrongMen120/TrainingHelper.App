import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import UserVM from './user';

function createUserVM(dto: any): SnapshotIn<typeof UserVM> {
  return { id: dto.identifier };
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
    
  }))
  .actions((self) => ({
    
  }));

export default UserCache;
