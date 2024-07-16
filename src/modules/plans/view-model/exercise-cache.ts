import { ExercisesInfoDetailsDto, ExercisesInfoDto } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import ExerciseVM from './exercise';
import ExerciseDetailsVM from './exercise-details';
import { safeDestroy } from 'src/common/utils/mst-helpers';

function createExerciseVM(dto: ExercisesInfoDto): SnapshotIn<typeof ExerciseVM> {
  return { id: dto.identifier, dto };
}
function createExerciseDetailsVM(dto: ExercisesInfoDetailsDto): SnapshotIn<typeof ExerciseDetailsVM> {
  return { id: dto.identifier, dto };
}
const ExerciseCache = types
  .model({
    ExercisesCache: types.map(ExerciseVM),
    ExercisesDetailsCache: types.map(ExerciseDetailsVM),
  })
  .volatile((self) => ({
    isLoadingExercise: true,
    isLoadingExerciseDetails: true,
    exerciseDetailsId: 0,
  }))
  .views((self) => ({
    get exercises() {
      return [...self.ExercisesCache.values()];
    },
    getExerciseById(id: string | number) {
      return self.ExercisesCache.get(id.toString());
    },
    get exercisesFiles() {
      return self.ExercisesDetailsCache.get(self.exerciseDetailsId.toString())?.files;
    },
    get exerciseDetails() {
      return self.ExercisesCache.get(self.exerciseDetailsId.toString());
     }, 
  }))
  .actions((self) => ({
    updateExercise(dtos: ExercisesInfoDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateExercise(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createExerciseVM, (d, m) => m.id);
      self.ExercisesCache.merge(update);
      self.isLoadingExercise = false;
    },
    updateExerciseDetails(dtos: ExercisesInfoDetailsDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updateExerciseDetails(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createExerciseDetailsVM, (d, m) => m.id);
      self.ExercisesDetailsCache.merge(update);
      self.isLoadingExerciseDetails = false;
    },
    deleteExercise(identifier: string | number) {
      const model = self.ExercisesCache.get(identifier.toString());
      self.ExercisesCache.delete(identifier.toString());
      safeDestroy(model);
      self.isLoadingExercise = false;
    },
    deleteExerciseFiles(identifier: string | number) {
      const model = self.ExercisesDetailsCache.get(identifier.toString());
      self.ExercisesDetailsCache.delete(identifier.toString());
      safeDestroy(model);
      self.isLoadingExerciseDetails = false;
    },
    setSelectedExerciseId(value: number) {
      self.exerciseDetailsId = Number(value);
    },
  }));

export default ExerciseCache;
