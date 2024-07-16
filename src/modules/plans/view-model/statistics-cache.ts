import { StatisticsDto } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import StatisticsVM from './statistics';

function createStatisticsVM(dto: StatisticsDto): SnapshotIn<typeof StatisticsVM> {
  return { id: dto.identifier, dto };
}
const StatisticsCache = types
  .model({
    StatisticsCache: types.map(StatisticsVM),
  })
  .volatile((self) => ({
    isLoadingStatistics: true,
  }))
  .views((self) => ({
    get statistics() {
      return [...self.StatisticsCache.values()];
    },
    getStatisticsByExerciseIdAndUserId(exerciseId: number, userId: number) {
      const res: any[] = [];
      this.statistics.map(stat => {
        if(stat.userId === userId && stat.exerciseId === exerciseId)
          res.push({date:`${stat.date.getDay()}`, workoutIntensity: stat.workoutIntensity, workoutVolume: stat.workoutVolume});
      });
      return res;
    },
  }))
  .actions((self) => ({
    updateStatistics(dtos: StatisticsDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateStatistics(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createStatisticsVM, (d, m) => m.id);
      self.StatisticsCache.merge(update);
      self.isLoadingStatistics = false;
    },
    setLoadingStatistics(value: boolean) {
      self.isLoadingStatistics = value;
    }
  }));

export default StatisticsCache;
