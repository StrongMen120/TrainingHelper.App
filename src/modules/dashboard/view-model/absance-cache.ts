import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import AbsanceVM from './absance';

function createAbsanceVM(dto: any): SnapshotIn<typeof AbsanceVM> {
  return { id: dto.identifier };
}
const AbsanceCache = types
  .model({
    AbsanceCache: types.map(AbsanceVM),
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

export default AbsanceCache;
