import { DoneExercisesDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const DoneExerciseVM = types
  .model('doneExercise', {
    id: types.string,
    dto: types.frozen<DoneExercisesDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','brakeSeconds','createdAt','createdBy','date','exerciseInfo','exerciseInfoId','modifiedAt','modifiedBy','rate','userId','series','weight','reps','rpe']));

export default DoneExerciseVM;
