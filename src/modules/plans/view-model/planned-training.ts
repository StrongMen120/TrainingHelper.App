import { PlannedTrainingsDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const PlannedTrainingVM = types
  .model('plannedTraining', {
    id: types.string,
    dto: types.frozen<PlannedTrainingsDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','groupId','plans','plansId','plansType','trainerId','userId','createdAt','createdBy','dateEnd','dateStart','modifiedAt','modifiedBy']));

export default PlannedTrainingVM;
