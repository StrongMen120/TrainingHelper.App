import { ProviderContext as SnackbarContext } from 'notistack';
import * as PlansApi from '@trainerhelper/plans-api';

export interface PlansEnvironment {
  apis: Readonly<EnvironmentApis>;
  snackbarContext: SnackbarContext;
}
interface EnvironmentApis {
  plansApi: PlansApi.PlansApi;
  statisticsApi: PlansApi.StatisticsApi;
  attachmentApi: PlansApi.AttachmentApi;
  doneExerciseApi: PlansApi.DoneExerciseApi;
  exercisesInfoApi: PlansApi.ExercisesInfoApi;
  plannedTrainingApi: PlansApi.PlannedTrainingApi;
}
