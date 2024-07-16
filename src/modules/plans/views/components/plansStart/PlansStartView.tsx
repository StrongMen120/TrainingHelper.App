import { Divider, Grid, Pagination, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { useState } from 'react';
import PlanVM from 'src/modules/plans/view-model/plans';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { PlansStartExerciseInfo } from './PlansStartExerciseInfo';
import { PlansStartPlannedExerciseSeries } from './PlansStartPlannedExerciseSeries';
import { PlannedExercisesView } from '../plansDetails/PlansDetailsExercise';

export const PlansStartView: React.FC<{ plannedExercise: PlannedExercisesView[]; plansRoot: Instance<typeof PlansRoot> }> = observer(({ plannedExercise, plansRoot }) => {
  return (
    <Stack>
      {plannedExercise.map((item) => (
        <>
          <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px', margin: '5px' }}>
            <Grid item xs={4}>
              <PlansStartExerciseInfo plannedExercise={item} plansRoot={plansRoot} />
            </Grid>
            <Grid item xs={8}>
              <PlansStartPlannedExerciseSeries plannedExercise={item} />
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </Stack>
  );
});
