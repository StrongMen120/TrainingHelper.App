import { ExercisesInfoDetailsDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const ExerciseDetailsVM = types
  .model('exerciseDetails', {
    id: types.number,
    dto: types.frozen<ExercisesInfoDetailsDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','name', 'description', 'files', 'bodyElements', 'authorId']));

export default ExerciseDetailsVM;
