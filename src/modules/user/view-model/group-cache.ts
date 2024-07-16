import { GroupDto, UserDto } from '@trainerhelper/users-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import GroupVM from './group';

function createGroupVM(dto: GroupDto): SnapshotIn<typeof GroupVM> {
  return { id: dto.identifier, dto };
}
const GroupCache = types
  .model({
    GroupsCache: types.map(GroupVM),
  })
  .volatile((self) => ({
    isLoadingGroup: true,
    selectedGroupId: 0,
  }))
  .views((self) => ({
    get groups() {
      return [...self.GroupsCache.values()];
    },
    get currentGroup() {
      return this.getGroupById(self.selectedGroupId);
    },
    getGroupById(id: string | number) {
      return self.GroupsCache.get(id.toString());
    },
  }))
  .actions((self) => ({
    updateGroups(dtos: GroupDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateGroups(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createGroupVM, (d, m) => m.id);
      self.GroupsCache.merge(update);
      self.isLoadingGroup = false;
    },
    setSelectedGroupId(value: number) {
      self.selectedGroupId = Number(value);
    },
    setLoadingGroup(value: boolean) {
      self.isLoadingGroup = value;
    },
  }));

export default GroupCache;
