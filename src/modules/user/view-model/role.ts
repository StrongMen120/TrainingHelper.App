import { RoleDto } from '@trainerhelper/users-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const RoleVM = types
  .model('role', {
    id: types.number,
    dto: types.frozen<RoleDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier', 'name', 'description']));

export default RoleVM;
