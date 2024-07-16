import { types } from 'mobx-state-tree';
import { withIocPoolingUnsafe } from 'src/common/utils/mst-pool';
import { orderBy, groupBy } from 'lodash';
import ExerciseCache from './exercise-cache';
import PlansCache from './plans-cache';
import PlannedTrainingCache from './planned-training-cache';
import DoneExerciseCache from './done-exercise-cache';
import { createPlanRepositoryActions } from './plans-repository';
import { createExerciseRepositoryActions } from './exercise-repository';
import { createDoneExerciseRepositoryActions } from './done-exercise-repository';
import { createPlannedTrainingsRepositoryActions } from './planned-training-repository';
import { createRecordExerciseRepositoryActions } from './record-exercise-repository';
import { createStatisticsRepositoryActions } from './statistics-repository';
import { DoneExerciseDay, DoneExercisesView, SeriesInfo } from '../views/components/doneExercise/TreeViewDoneExercise';
import RecordExerciseCache from './record-exercise-cache';
import StatisticsCache from './statistics-cache';

export const PlansRoot = types
  .compose('Plans', PlansCache, ExerciseCache, DoneExerciseCache, PlannedTrainingCache, RecordExerciseCache, StatisticsCache)
  .extend(withIocPoolingUnsafe({ type: PlansCache }))
  .extend(withIocPoolingUnsafe({ type: ExerciseCache }))
  .extend(withIocPoolingUnsafe({ type: DoneExerciseCache }))
  .extend(withIocPoolingUnsafe({ type: PlannedTrainingCache }))
  .extend(withIocPoolingUnsafe({ type: RecordExerciseCache }))
  .extend(withIocPoolingUnsafe({ type: StatisticsCache }))
  .actions((self) => createPlanRepositoryActions(self))
  .actions((self) => createPlannedTrainingsRepositoryActions(self))
  .actions((self) => createExerciseRepositoryActions(self))
  .actions((self) => createDoneExerciseRepositoryActions(self))
  .actions((self) => createRecordExerciseRepositoryActions(self))
  .actions((self) => createStatisticsRepositoryActions(self))
  .views((self)=>({
    getTreeRows(userId: number): DoneExerciseDay[]{
      const rows: DoneExerciseDay[] = [];
      const doneExerciseDay = self.getDoneExerciseByUserId(userId);
      if (!doneExerciseDay) {
        return rows;
      }
      var sortedDoneExercise = orderBy(doneExerciseDay, 'date', 'desc');
      const allDoneExercise = groupBy(sortedDoneExercise, 'date');
      for (const [key, value] of Object.entries(allDoneExercise)) {
        rows.push({
          Id: rows.length,
          Date: new Date(key),
          DoneExercises: value.map((obj) => {
            let exercise = self.getExerciseById(obj.exerciseInfoId);
            const document: DoneExercisesView = {
              Identifier: obj.identifier,
              BrakeSeconds: obj.brakeSeconds,
              Rate: obj.rate,
              Series: obj.series,
              ExerciseId: obj.exerciseInfoId,
              ExerciseName: exercise ? exercise.name : '',
              SeriesInfo: [],
            }
            for (let i = 1; i <= obj.series; i++) {
              const series: SeriesInfo = {
                Id: i,
                Reps: obj.reps[i-1],
                Weight: obj.weight[i-1],
              };
              document.SeriesInfo.push(series);
            }
            return document;
          }),
        });
      }
      return rows;
    }
  }))
  .actions((self) => ({
    selectedExerciseDetails(exerciseId: number) {
      self.setSelectedExerciseId(exerciseId as number);
    }
  }));
