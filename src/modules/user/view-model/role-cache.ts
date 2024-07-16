import { RoleDto } from '@trainerhelper/users-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import RoleVM from './role';

function createRoleVM(dto: RoleDto): SnapshotIn<typeof RoleVM> {
  return { id: dto.identifier, dto };
}
const RoleCache = types
  .model({
    RolesCache: types.map(RoleVM),
  })
  .volatile((self) => ({
    isLoadingRole: true,
  }))
  .views((self) => ({
    get roles() {
      return [...self.RolesCache.values()];
    },
    getRolesById(arrayId: number[]) {
      const result: RoleDto[] = [];
      self.RolesCache.forEach((v) => {
        if (arrayId.includes(v.id)) result.push(v.dto);
      });
      return result;
    },
  }))
  .actions((self) => ({
    updateRoles(dtos: RoleDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateRoles(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createRoleVM, (d, m) => m.id);
      self.RolesCache.merge(update);
      self.isLoadingRole = false;
    },
  }));

export default RoleCache;
