import { ExercisesRecordsDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const RecordExerciseVM = types
  .model('recordExercise', {
    id: types.string,
    dto: types.frozen<ExercisesRecordsDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','createdAt','createdBy','date','modifiedAt','modifiedBy','userId','weight','reps','adamsResult','baechleResult','bergerResult','brownResult','brzyckiResult','epleyResult','exerciseId','isAutomat','lombardiResult','mayhewResult','oneRepetitionMaximum','revision']));

export default RecordExerciseVM;
