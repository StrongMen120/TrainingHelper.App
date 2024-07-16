import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { ProviderContext as SnackbarContext, useSnackbar } from 'notistack';
import { PlansEnvironment } from '../../abstraction/PlansEnvironment';
import { AuthContextValue } from 'src/context/Auth0Context';
import { RuntimeConfig } from 'src/RuntimeConfig';
import { createJwtAuthMiddleware } from 'src/common/utils/api-client-helper';
import * as PlansApi from '@trainerhelper/plans-api';
import { useRuntimeConfig } from 'src/hooks/useRuntimeConfig';
import useAuth from 'src/hooks/useAuth';
import { PlansRoot } from '../../view-model/plans-root';
import { PlansProvider } from '../../context/PlansContext';
import { PlansModalsProvider } from '../../modals';

function createEnv(runtimeConfig: RuntimeConfig, auth: AuthContextValue, snackbar: SnackbarContext): PlansEnvironment {
  const configurationUserApi = new PlansApi.Configuration({
    basePath: runtimeConfig.plansApiBaseUrl,
    middleware: [createJwtAuthMiddleware(auth)],
  });
  return {
    apis: {
      plansApi: new PlansApi.PlansApi(configurationUserApi),
      statisticsApi: new PlansApi.StatisticsApi(configurationUserApi),
      attachmentApi: new PlansApi.AttachmentApi(configurationUserApi),
      doneExerciseApi: new PlansApi.DoneExerciseApi(configurationUserApi),
      exercisesInfoApi: new PlansApi.ExercisesInfoApi(configurationUserApi),
      plannedTrainingApi: new PlansApi.PlannedTrainingApi(configurationUserApi),
    },
    snackbarContext: snackbar,
  };
}

export const PlansLayout = observer(({ children }) => {
  const runtimeConfig = useRuntimeConfig();
  const auth = useAuth();
  const snackbar = useSnackbar();
  const env = createEnv(runtimeConfig, auth, snackbar);
  const root = useMemo(() => PlansRoot.create({}, env), []);

  return (
    <PlansModalsProvider>
      <PlansProvider value={root}>{children}</PlansProvider>
    </PlansModalsProvider>
  );
});
