import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from 'mobx-react-lite';
import { DoneExercisesView } from './TreeViewDoneExercise';
import { usePlansRoot } from 'src/modules/plans/context/PlansContext';
import { usePlansModals } from 'src/modules/plans/modals';
import { UpdateDoneExerciseCommand } from '@trainerhelper/plans-api';

export const TreeDoneExerciseView: React.FC<{ doneExercise: DoneExercisesView }> = observer(({ doneExercise }) => {
  const plansRoot = usePlansRoot();
  const { removeDoneExerciseModal, addDoneExerciseModal } = usePlansModals().doneExerciseModals;
  return (
    <Stack direction="row" alignItems="center">
      <Stack direction="row" py={0.3} ml={0.5} spacing={0.3} alignItems="center">
        <Typography variant="h6" flex={0.3} width={500}>
          {doneExercise.ExerciseName}
        </Typography>
        <Stack direction="row" alignItems="center" width={100}>
          Series: {doneExercise.Series}
        </Stack>
        <Stack direction="row" alignItems="center" width={100}>
          Rate: {doneExercise.Rate}
        </Stack>
        <Stack direction="row" alignItems="center" width={100}>
          Brake: {doneExercise.BrakeSeconds}s
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button
            color="primary"
            sx={{ mr: 0.5 }}
            onClick={() => {
              plansRoot.setSelectedDoneExercise(doneExercise.Identifier);
              addDoneExerciseModal.open(async (result) => {
                const command: UpdateDoneExerciseCommand = {
                  exerciseInfoId: result.exerciseId,
                  brakeSeconds: result.brake,
                  rate: result.rate,
                  reps: result.doneSeries.map((e) => e.Reps),
                  rpe: result.rpe,
                  series: result.series,
                  weight: result.doneSeries.map((e) => e.Weight),
                  date: result.date,
                };
                await plansRoot.fetchUpdateDoneExercise(doneExercise.Identifier, command);
                return true;
              });
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button
            color="primary"
            onClick={() => {
              removeDoneExerciseModal.open(async () => {
                await plansRoot.fetchDeleteDoneExercise(doneExercise.Identifier);
                return true;
              });
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
});
