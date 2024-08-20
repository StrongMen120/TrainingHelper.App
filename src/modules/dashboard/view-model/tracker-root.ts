import { types } from 'mobx-state-tree';
import { withIocPoolingUnsafe } from 'src/common/utils/mst-pool';
import { createUserRepositoryActions } from './user-repository';
import UserCache from './user-cache';
import AbsanceCache from './absance-cache';
import { createAbsanceRepositoryActions } from './apsance-repository';

export const TrackerRoot = types
  .compose('Tracker', UserCache, AbsanceCache)
  .extend(withIocPoolingUnsafe({ type: UserCache }))
  .extend(withIocPoolingUnsafe({ type: AbsanceCache }))
  .actions((self) => createUserRepositoryActions(self))
  .actions((self) => createAbsanceRepositoryActions(self));
