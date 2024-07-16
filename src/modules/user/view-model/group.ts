import { GroupDto } from '@trainerhelper/users-api';
import { types, getIdentifier, resolveIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';
import UserVM from './user';

const GroupVM = types
  .model('group', {
    id: types.number,
    dto: types.frozen<GroupDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier', 'name', 'trainer', 'members']))
  .views((self) => ({
    get trainerGet() {
      try {
        return resolveIdentifier(UserVM, self, self.trainer.identifier);
      } catch {
        return null;
      }
    },
  }));

export default GroupVM;
