import { flow, getEnv, Instance } from 'mobx-state-tree';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import PlannedTrainingCache from './planned-training-cache';
import { AsyncReturnType } from 'src/types/promise-types';
import { CreatePlannedTrainingCommand, UpdatePlannedTrainingCommand } from '@trainerhelper/plans-api';

export function createPlannedTrainingsRepositoryActions(context: Instance<typeof PlannedTrainingCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchAllPlannedTrainingsToUser: flow(function* (userId: number, initOverrides?: RequestInit) {
      try {
        context.setLoadingPlannedTrainings(true); 
        const dtos: AsyncReturnType<typeof env.apis.plannedTrainingApi.getAllUserPlannedTrainings> = yield env.apis.plannedTrainingApi.getAllUserPlannedTrainings(userId);
        return context.updatePlannedTrainings(dtos);
      } catch {
        context.setLoadingPlannedTrainings(false); 
        env.snackbarContext.enqueueSnackbar('An error while reads planned trainings.', { variant: 'error' });
      }
    }),
    fetchPlannedTrainingById: flow(function* (identifier: string, initOverrides?: RequestInit) {
      try {
        context.setLoadingPlannedTrainings(true); 
        const dto: AsyncReturnType<typeof env.apis.plannedTrainingApi.getPlannedTraining> = yield env.apis.plannedTrainingApi.getPlannedTraining(identifier);
        return context.updatePlannedTrainings([dto]);
      } catch {
        context.setLoadingPlannedTrainings(false); 
        env.snackbarContext.enqueueSnackbar('An error while read planned training.', { variant: 'error' });
      }
    }),
    fetchCreatePlannedTraining: flow(function* (command: CreatePlannedTrainingCommand, initOverrides?: RequestInit) {
      try {
        context.setLoadingPlannedTrainings(true); 
        const dto: AsyncReturnType<typeof env.apis.plannedTrainingApi.createPlannedTraining> = yield env.apis.plannedTrainingApi.createPlannedTraining(command);
        return context.updatePlannedTrainings([dto]);
      } catch {
        context.setLoadingPlannedTrainings(false); 
        env.snackbarContext.enqueueSnackbar('An error while create planned training.', { variant: 'error' });
      }
    }),
    fetchDeletePlannedTraining: flow(function* (identifier: string, initOverrides?: RequestInit) {
      try {
        context.setLoadingPlannedTrainings(true); 
        const dto: AsyncReturnType<typeof env.apis.plannedTrainingApi.deletePlannedTraining> = yield env.apis.plannedTrainingApi.deletePlannedTraining(identifier);
        return context.deletePlannedTraining(dto.identifier);
      } catch {
        context.setLoadingPlannedTrainings(false); 
        env.snackbarContext.enqueueSnackbar('An error while delete planned training.', { variant: 'error' });
      }
    }),
    fetchUpdatePlannedTraining: flow(function* (command: UpdatePlannedTrainingCommand, initOverrides?: RequestInit) {
      try {
        context.setLoadingPlannedTrainings(true); 
        const dto: AsyncReturnType<typeof env.apis.plannedTrainingApi.updatePlannedTraining> = yield env.apis.plannedTrainingApi.updatePlannedTraining(command);
        return context.updatePlannedTrainings([dto]);
      } catch {
        context.setLoadingPlannedTrainings(false); 
        env.snackbarContext.enqueueSnackbar('An error while update planned training.', { variant: 'error' });
      }
    }),
  };
}

export type PlannedTrainingRepository = ReturnType<typeof createPlannedTrainingsRepositoryActions>;
