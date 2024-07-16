import { flow, getEnv, Instance } from 'mobx-state-tree';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import DoneExerciseCache from './done-exercise-cache';
import { AsyncReturnType } from 'src/types/promise-types';
import { CreateDoneExerciseCommand, UpdateDoneExerciseCommand } from '@trainerhelper/plans-api';

export function createDoneExerciseRepositoryActions(context: Instance<typeof DoneExerciseCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchDoneExerciseToUser: flow(function* (userId: number, initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.doneExerciseApi.getAllDoneExercise> = yield env.apis.doneExerciseApi.getAllDoneExercise(userId);
        return context.updateDoneExercise(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while reads doneExercise to userId:${userId}.`, { variant: 'error' });
      }
    }),
    fetchUpdateDoneExercise: flow(function* (identifier: string, command: UpdateDoneExerciseCommand, initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.doneExerciseApi.updateDoneExercise> = yield env.apis.doneExerciseApi.updateDoneExercise(identifier, command);
        return context.updateDoneExercise([dtos]);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while update doneExercise.`, { variant: 'error' });
      }
    }),
    fetchCreateDoneExercise: flow(function* (command: CreateDoneExerciseCommand, initOverrides?: RequestInit) {
      try {
        context.setLoadingDoneExercise(true);
        const dtos: AsyncReturnType<typeof env.apis.doneExerciseApi.createDoneExercise> = yield env.apis.doneExerciseApi.createDoneExercise(command);
        return context.updateDoneExercise(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while created doneExercise.`, { variant: 'error' });
      }
    }),
    fetchDeleteDoneExercise: flow(function* (identifier: string, initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.doneExerciseApi.deleteDoneExercise> = yield env.apis.doneExerciseApi.deleteDoneExercise(identifier);
        return context.deleteDoneExercise(dtos.identifier);
      } catch {
        env.snackbarContext.enqueueSnackbar(`An error while deleted doneExercise.`, { variant: 'error' });
      }
    }),
  };
}

export type DoneExerciseRepository = ReturnType<typeof createDoneExerciseRepositoryActions>;
