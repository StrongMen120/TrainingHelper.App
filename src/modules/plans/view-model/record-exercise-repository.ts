import { flow, getEnv, Instance } from 'mobx-state-tree';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import { CreateExercisesRecordsCommand } from '@trainerhelper/plans-api';
import RecordExerciseCache from './record-exercise-cache';

export function createRecordExerciseRepositoryActions(context: Instance<typeof RecordExerciseCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchAllRecordsExerciseToUser: flow(function* (userId: number, initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.statisticsApi.getExercisesAllRecords> = yield env.apis.statisticsApi.getExercisesAllRecords(userId);
        return context.updateRecordExercise(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while reads all records Exercise to userId:${userId}.`, { variant: 'error' });
      }
    }),
    fetchRecordsExerciseHistoryToUser: flow(function* (exerciseId: number, userId: number, initOverrides?: RequestInit) {
      try {
        context.setLoadingRecordsExerciseHistory(true);
        context.RecordExerciseHistoryCache.clear();
        const dtos: AsyncReturnType<typeof env.apis.statisticsApi.getExercisesRecordsHistory> = yield env.apis.statisticsApi.getExercisesRecordsHistory(exerciseId, userId);
        return context.updateRecordExerciseHistory(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while reads records to Exercise to userId:${userId} exerciseID:${exerciseId}.`, { variant: 'error' });
      }
    }),
    fetchCreateRecordsExercise: flow(function* (command: CreateExercisesRecordsCommand, initOverrides?: RequestInit) {
      try {
        context.setLoadingRecordsExercise(true);
        context.setLoadingRecordsExerciseHistory(true);
        context.RecordExerciseHistoryCache.clear();
        yield env.apis.statisticsApi.createExercisesRecords(command);
        context.RecordExerciseCache.clear();
        const dtos: AsyncReturnType<typeof env.apis.statisticsApi.getExercisesAllRecords> = yield env.apis.statisticsApi.getExercisesAllRecords(command.userId);
        return context.updateRecordExercise(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while created new records.`, { variant: 'error' });
        context.setLoadingRecordsExercise(false);
        context.setLoadingRecordsExerciseHistory(false);
      }
    }),
  };
}

export type RecordExerciseRepository = ReturnType<typeof createRecordExerciseRepositoryActions>;
