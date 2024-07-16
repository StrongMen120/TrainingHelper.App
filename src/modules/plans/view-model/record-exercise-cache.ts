import { ExercisesRecordsDto } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import RecordExerciseVM from './record-exercise';

function createRecordExerciseVM(dto: ExercisesRecordsDto): SnapshotIn<typeof RecordExerciseVM> {
  return { id: dto.identifier + '-' + dto.revision, dto };
}
const RecordExerciseCache = types
  .model({
    RecordExerciseCache: types.map(RecordExerciseVM),
    RecordExerciseHistoryCache: types.map(RecordExerciseVM),
  })
  .volatile((self) => ({
    isLoadingRecordExercise: true,
    isLoadingRecordExerciseHistory: true,
  }))
  .views((self) => ({
    get recordExercise() {
      return [...self.RecordExerciseCache.values()];
    },
    get recordExerciseHistory() {
      return [...self.RecordExerciseHistoryCache.values()].sort(p => p.oneRepetitionMaximum);
    }
  }))
  .actions((self) => ({
    updateRecordExercise(dtos: ExercisesRecordsDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateRecordExercise(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createRecordExerciseVM, (d, m) => m.id);
      self.RecordExerciseCache.merge(update);
      self.isLoadingRecordExercise = false;
    },
    updateRecordExerciseHistory(dtos: ExercisesRecordsDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateRecordExercise(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createRecordExerciseVM, (d, m) => m.id);
      self.RecordExerciseHistoryCache.merge(update);
      self.isLoadingRecordExerciseHistory = false;
    },
    setLoadingRecordsExercise(value: boolean) {
      self.isLoadingRecordExercise = value;
    },
    setLoadingRecordsExerciseHistory(value: boolean) {
      self.isLoadingRecordExerciseHistory = value;
    },
  }));

export default RecordExerciseCache;
