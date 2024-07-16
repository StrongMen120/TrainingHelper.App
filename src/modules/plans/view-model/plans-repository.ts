import { flow, getEnv, Instance } from 'mobx-state-tree';
import { PlansEnvironment } from '../abstraction/PlansEnvironment';
import PlansCache from './plans-cache';
import { AsyncReturnType } from 'src/types/promise-types';
import { CreatePlansCommand, UpdatePlansCommand } from '@trainerhelper/plans-api';

export function createPlanRepositoryActions(context: Instance<typeof PlansCache>) {
  const env = getEnv<PlansEnvironment>(context);
  return {
    fetchAllPlansUser: flow(function* (userId: number, initOverrides?: RequestInit) {
      try {
        const dtos: AsyncReturnType<typeof env.apis.plansApi.getAllUserPlans> = yield env.apis.plansApi.getAllUserPlans(userId);
        return context.updatePlans(dtos);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while reads plans.', { variant: 'error' });
      }
    }),
    fetchPlansById: flow(function* (identifier: number, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.plansApi.getPlan> = yield env.apis.plansApi.getPlan(identifier);
        return context.updatePlans([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while read plan.', { variant: 'error' });
      }
    }),
    fetchDeletePlan: flow(function* (identifier: number, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.plansApi.deletePlans> = yield env.apis.plansApi.deletePlans(identifier);
        return context.updatePlans([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while delete plan.', { variant: 'error' });
      }
    }),
    fetchCreatePlan: flow(function* (command: CreatePlansCommand, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.plansApi.createPlans> = yield env.apis.plansApi.createPlans(command);
        return context.updatePlans([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while create plan.', { variant: 'error' });
      }
    }),
    fetchUpdatePlan: flow(function* (identifier: number, command: UpdatePlansCommand, initOverrides?: RequestInit) {
      try {
        const dto: AsyncReturnType<typeof env.apis.plansApi.updatePlans> = yield env.apis.plansApi.updatePlans(identifier, command);
        return context.updatePlans([dto]);
      } catch {
        env.snackbarContext.enqueueSnackbar('An error while update plan.', { variant: 'error' });
      }
    }),
  };
}

export type PlansRepository = ReturnType<typeof createPlanRepositoryActions>;
