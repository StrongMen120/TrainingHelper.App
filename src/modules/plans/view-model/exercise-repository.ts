import { flow, getEnv, Instance } from 'mobx-state-tree';
import ExercisesCache from './exercise-cache';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import { AsyncReturnType } from 'src/types/promise-types';
import { CreateExerciseInfoCommand, UpdateExerciseInfoCommand } from '@trainerhelper/plans-api';

export function createExerciseRepositoryActions(context: Instance<typeof ExercisesCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchAllExercise: flow(function* (initOverrides?: RequestInit) {
      try {
      const dtos: AsyncReturnType<typeof env.apis.exercisesInfoApi.getAllExercisesInfo> = yield env.apis.exercisesInfoApi.getAllExercisesInfo();
      return context.updateExercise(dtos);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while reads all exerciseInfo.', { variant: 'error' });
    }
    }),
    fetchExercise: flow(function* (identifier: number,initOverrides?: RequestInit) {
      try {
      const dtos: AsyncReturnType<typeof env.apis.exercisesInfoApi.getExerciseInfo> = yield env.apis.exercisesInfoApi.getExerciseInfo(identifier);
      return context.updateExercise([dtos]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while reads exerciseInfo.', { variant: 'error' });
    }
    }),
    fetchExerciseDetails: flow(function* (identifier: number, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.attachmentApi.getExercisesInfoAttachment> = yield env.apis.attachmentApi.getExercisesInfoAttachment(identifier);
      return context.updateExerciseDetails([dto]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while reads exercise details info.', { variant: 'error' });
    }
    }),
    fetchUploadFiles: flow(function* (identifier: number, photoFile: Blob, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.attachmentApi.updateExercisesInfoAttachment> = yield env.apis.attachmentApi.updateExercisesInfoAttachment(identifier,photoFile);
      return context.updateExerciseDetails([dto]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while adds photo to exercise.', { variant: 'error' });
    }
    }),
    fetchDeleteFiles: flow(function* (identifier: number, photoName: string, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.attachmentApi.deleteExercisesInfoAttachment> = yield env.apis.attachmentApi.deleteExercisesInfoAttachment(`${photoName}-EXI${identifier}`, identifier);
      return context.updateExerciseDetails([dto]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while removed photo to exercise.', { variant: 'error' });
    }
    }),
    fetchCreateExercise: flow(function* (command: CreateExerciseInfoCommand, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.exercisesInfoApi.createExerciseInfo> = yield env.apis.exercisesInfoApi.createExerciseInfo(command);
      return context.updateExercise([dto]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while created exerciseInfo.', { variant: 'error' });
    }
    }),
    fetchUpdateExercise: flow(function* (command: UpdateExerciseInfoCommand, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.exercisesInfoApi.updateExerciseInfo> = yield env.apis.exercisesInfoApi.updateExerciseInfo(command);
      return context.updateExercise([dto]);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while updated exerciseInfo.', { variant: 'error' });
    }
    }),
    fetchDeleteExercise: flow(function* (identifier: number, initOverrides?: RequestInit) {
      try {
      const dto: AsyncReturnType<typeof env.apis.exercisesInfoApi.deleteExerciseInfo> = yield env.apis.exercisesInfoApi.deleteExerciseInfo(identifier);
      context.deleteExerciseFiles(dto.identifier)
      return context.deleteExercise(dto.identifier);
    } catch {
      env.snackbarContext.enqueueSnackbar('An error while removed exerciseInfo.', { variant: 'error' });
    }
    }),
  };
}

export type ExerciseRepository = ReturnType<typeof createExerciseRepositoryActions>;
