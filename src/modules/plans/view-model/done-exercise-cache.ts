import { DoneExercisesDto } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import DoneExerciseVM from './done-exercise';
import { safeDestroy } from 'src/common/utils/mst-helpers';
import { SeriesInfo } from '../views/components/doneExercise/TreeViewDoneExercise';

function createDoneExerciseVM(dto: DoneExercisesDto): SnapshotIn<typeof DoneExerciseVM> {
  return { id: dto.identifier, dto };
}
const DoneExerciseCache = types
  .model({
    DoneExerciseCache: types.map(DoneExerciseVM),
  })
  .volatile((self) => ({
    isLoadingDoneExercise: true,
    doneExerciseUserId: 0,
    selectedDoneExercise: '',
  }))
  .views((self) => ({
    get doneExercise() {
      return [...self.DoneExerciseCache.values()];
    },
    get editedDoneExercise() {
      return self.DoneExerciseCache.get(self.selectedDoneExercise)
    },
    getDoneExerciseByUserId(userId: string | number) {
      return [...self.DoneExerciseCache.values()].filter(doneExercise => doneExercise.userId === userId)
    },
    get editedDoneExerciseSeriesInfo(): SeriesInfo[] {
      const row = this.editedDoneExercise;
      const rows: SeriesInfo[] =  [];
      if(row){
        for (let i = 0; i < row.series; i++) {
          rows.push({Id:i+1,Weight: row.weight[i],Reps:row.reps[i]});
        }
      }
      return rows;
    },
  }))
  .actions((self) => ({
    updateDoneExercise(dtos: DoneExercisesDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateDoneExercise(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createDoneExerciseVM, (d, m) => m.id);
      self.DoneExerciseCache.merge(update);
      self.isLoadingDoneExercise = false;
    },
    setDoneExerciseUserId(value: number) {
      self.doneExerciseUserId = Number(value);
    },
    setLoadingDoneExercise(value: boolean) {
      self.isLoadingDoneExercise = value;
    },
    setSelectedDoneExercise(id: string) {
      self.selectedDoneExercise = id;
    },
    deleteDoneExercise(identifier: string | number) {
      const model = self.DoneExerciseCache.get(identifier.toString());
      self.DoneExerciseCache.delete(identifier.toString());
      safeDestroy(model);
      self.isLoadingDoneExercise = false;
    },
  }));

export default DoneExerciseCache;
