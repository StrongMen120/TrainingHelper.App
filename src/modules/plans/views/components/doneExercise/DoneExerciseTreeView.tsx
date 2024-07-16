import { Button, Divider, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import TreeViewDoneExercise from './TreeViewDoneExercise';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { usePlansModals } from 'src/modules/plans/modals';
import AddDoneExerciseDialog from './Dialog/AddDoneExerciseDialog';
import RemovedDoneExerciseDialog from './Dialog/RemovedDoneExerciseDialog';
import { Routes } from 'src/routes';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';

export const DoneExerciseTreeView: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  const { addDoneExerciseModal } = usePlansModals().doneExerciseModals;
  return (
    <Paper elevation={2} style={{ height: 'inherit' }}>
      <CommonHeader headerTitle="Done Exercise" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Exercise' }, { name: 'Done Exercise', href: Routes.exercise.doneExercise }]} />} />
      <Divider />
      <Stack height="90%" p={2}>
        <Stack direction="row" sx={{ mt: 0.5, mb: 2.5, mr: 10 }}>
          {userRoot.checkIsAdmin() && (
            <TextField
              select
              defaultValue={userRoot.loginUserId}
              label="Select User"
              sx={{ width: 300, mr: 5 }}
              onChange={(e) => {
                plansRoot.fetchDoneExerciseToUser(Number(e.target.value));
                plansRoot.setDoneExerciseUserId(Number(e.target.value));
              }}
            >
              {userRoot.users.map((user) => (
                <MenuItem key={user.identifier} value={user.identifier}>
                  {`[${user.identifier}] ${user.firstName} ${user.secondName}`}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              plansRoot.setSelectedDoneExercise('');
              addDoneExerciseModal.open(async (result) => {
                plansRoot.fetchCreateDoneExercise({
                  userId: userRoot.loginUserId,
                  date: result.date,
                  doneExercise: [
                    {
                      brakeSeconds: result.brake,
                      exerciseInfoId: result.exerciseId,
                      rate: result.rate,
                      reps: result.doneSeries.map((e) => e.Reps),
                      rpe: result.rpe,
                      series: result.series,
                      weight: result.doneSeries.map((e) => e.Weight),
                    },
                  ],
                });
                return true;
              });
            }}
            startIcon={<AddCircleIcon />}
          >
            Add Done Exercise
          </Button>
        </Stack>
        <Stack height="90%" spacing={2}>
          <TreeViewDoneExercise plansRoot={plansRoot} userRoot={userRoot}></TreeViewDoneExercise>
        </Stack>
      </Stack>
      <AddDoneExerciseDialog plansRoot={plansRoot} doneExercise={plansRoot.editedDoneExercise}></AddDoneExerciseDialog>
      <RemovedDoneExerciseDialog root={plansRoot}></RemovedDoneExerciseDialog>
    </Paper>
  );
});
