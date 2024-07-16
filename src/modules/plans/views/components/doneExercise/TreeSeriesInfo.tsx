import { Stack, Typography } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { SeriesInfo } from './TreeViewDoneExercise';

export const TreeSeriesInfo: React.FC<{ seriesInfo: SeriesInfo }> = observer(({ seriesInfo }) => {
  return (
    <Stack color="primary" direction="row" alignItems="center">
      <Stack direction="row" py={0.5} ml={5} spacing={0.5} alignItems="center">
        <Typography variant="h6" flex={0.3} width={500}>
          Series: {seriesInfo.Id}
        </Typography>
        <Stack direction="row" alignItems="center" width={180}>
          Reps: {seriesInfo.Reps}
        </Stack>
        <Stack direction="row" alignItems="center" width={180}>
          Weight: {seriesInfo.Weight}
        </Stack>
        <Stack direction="row" alignItems="center" width={180}>
          Series Volume: {seriesInfo.Reps * seriesInfo.Weight}
        </Stack>
      </Stack>
    </Stack>
  );
});
