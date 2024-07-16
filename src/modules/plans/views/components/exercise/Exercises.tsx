import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { Divider, Grid, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { ExerciseDetails } from './ExerciseDetails';
import { ExerciseTable } from './ExerciseTable';
import AddExerciseDialog from './dialog/AddExerciseDialog';
import RemovedExerciseDialog from './dialog/RemovedDoneExerciseDialog';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { Routes } from 'src/routes';

export const Exercises: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  return (
    <Stack height={'100%'}>
      <CommonHeader headerTitle="Exercise" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Exercise' }, { name: 'Exercise', href: Routes.exercise.exercises }]} />} />
      <Divider />
      <Stack height={'100%'}>
        <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px' }}>
          <Grid item xs={5}>
            <ExerciseTable plansRoot={plansRoot} userRoot={userRoot} />
          </Grid>
          <Grid item xs={7}>
            <ExerciseDetails plansRoot={plansRoot} userRoot={userRoot} />
          </Grid>
        </Grid>
      </Stack>
      <AddExerciseDialog root={plansRoot} />
      <RemovedExerciseDialog root={plansRoot} />
    </Stack>
  );
});
