import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { observer } from 'mobx-react-lite';
import { DoneExerciseDay } from './TreeViewDoneExercise';

export const TreeDateView: React.FC<{ dayDoneExercise: DoneExerciseDay; isLoading: boolean }> = observer(({ dayDoneExercise, isLoading }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Stack direction="row" py={0.5} spacing={0.5} alignItems="center" width={700}>
        <Stack direction="row" width={250} spacing={0.5} alignItems="center">
          <InsertInvitationIcon color="primary" fontSize="medium" />
          <Typography variant="h5">{dayDoneExercise.Date.toISOString().slice(0, 10)}</Typography>
        </Stack>
      </Stack>
      {!isLoading && <CircularProgress size={18} />}
    </Stack>
  );
});
