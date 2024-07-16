import { UserDto } from '@trainerhelper/users-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const UserVM = types
  .model('user', {
    id: types.number,
    dto: types.frozen<UserDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier', 'firstName', 'secondName', 'email', 'height', 'phone', 'sex', 'weight', 'birthday', 'rolesId', 'groupsId']));

export default UserVM;
