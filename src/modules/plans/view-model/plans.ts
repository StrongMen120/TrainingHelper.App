import { PlansDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const PlanVM = types
  .model('plan', {
    id: types.number,
    dto: types.frozen<PlansDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','authorId','image','createdAt','createdBy','description','modifiedAt','modifiedBy','name','plannedExercise']));

export default PlanVM;
