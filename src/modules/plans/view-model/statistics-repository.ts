import { flow, getEnv, Instance } from 'mobx-state-tree';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import StatisticsCache from './statistics-cache';

export function createStatisticsRepositoryActions(context: Instance<typeof StatisticsCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchExerciseStatistics: flow(function* (userId: number, exerciseId: number, year: number, month: number, initOverrides?: RequestInit) {
      try {
        context.StatisticsCache.clear();
        context.setLoadingStatistics(true);
        const dtos: AsyncReturnType<typeof env.apis.statisticsApi.getExerciseStatistics> = yield env.apis.statisticsApi.getExerciseStatistics(exerciseId, userId, year, month);
        return context.updateStatistics(dtos);
      } catch {
        context.setLoadingStatistics(false);
        env.snackbarContext.enqueueSnackbar(`An error while reads all records Exercise to userId:${userId}.`, { variant: 'error' });
      }
    }),
  };
}

export type RecordExerciseRepository = ReturnType<typeof createStatisticsRepositoryActions>;
