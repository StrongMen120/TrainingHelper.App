import { ExercisesInfoDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const ExerciseVM = types
  .model('exercise', {
    id: types.number,
    dto: types.frozen<ExercisesInfoDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','bodyElements','name', 'description', 'files', 'authorId']));

export default ExerciseVM;
