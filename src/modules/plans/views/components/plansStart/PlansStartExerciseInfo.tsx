import { Grid, Pagination, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { useEffect, useState } from 'react';
import PlanVM from 'src/modules/plans/view-model/plans';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { PlannedExercisesView } from '../plansDetails/PlansDetailsExercise';

export const PlansStartExerciseInfo: React.FC<{ plannedExercise: PlannedExercisesView; plansRoot: Instance<typeof PlansRoot> }> = observer(({ plannedExercise, plansRoot }) => {
  const exerciseInfo = plansRoot.getExerciseById(plannedExercise.ExerciseId);
  return (
    <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px' }}>
      <Grid item xs={12}>
        <Typography variant="h3">Name: {exerciseInfo?.name}</Typography>
        <Typography variant="h4">Series: {plannedExercise.Series}</Typography>
        <Typography variant="h4">RPE: {plannedExercise.RPE}</Typography>
        <Typography variant="h4">Rate: {plannedExercise.Rate}</Typography>
        <Typography variant="h4">BrakeSeconds: {plannedExercise.BrakeSeconds}</Typography>
      </Grid>
    </Grid>
  );
});
