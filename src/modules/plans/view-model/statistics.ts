import { StatisticsDto } from '@trainerhelper/plans-api';
import { types, getIdentifier } from 'mobx-state-tree';
import { withBoundViews } from '../../../common/utils/mst-helpers';

const StatisticsVM = types
  .model('statistics', {
    id: types.string,
    dto: types.frozen<StatisticsDto>(),
  })
  .volatile((self) => ({
    identifier: getIdentifier(self) ?? self.id.toString(),
  }))
  .extend(withBoundViews('dto', ['identifier','date','userId','exerciseId','workoutIntensity','workoutVolume']));

export default StatisticsVM;
