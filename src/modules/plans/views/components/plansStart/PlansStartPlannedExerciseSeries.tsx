import { Grid, Stack, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { PlannedExercisesView } from '../plansDetails/PlansDetailsExercise';

export const PlansStartPlannedExerciseSeries: React.FC<{ plannedExercise: PlannedExercisesView }> = observer(({ plannedExercise }) => {
  return (
    <Grid container spacing={1}>
      {plannedExercise.SeriesInfo.map((el) => (
        <Grid item xs={12} key={el.Id}>
          <Stack direction="row" alignItems="center" width={'100%'} height={50}>
            <Typography variant="h4" flex={0.3} width={20} color={'blue'}>
              {el.Id}
            </Typography>
            <TextField
              onChange={(e) => {
                const row = plannedExercise.SeriesInfo.find((r) => r.Id === el.Id);
                if (row) {
                  row.Reps = Number(e.target.value);
                }
              }}
              defaultValue={el.Reps}
              label="Reps"
              type="number"
              sx={{ width: 200 }}
            />
            <TextField
              onChange={(e) => {
                const row = plannedExercise.SeriesInfo.find((r) => r.Id === el.Id);
                if (row) {
                  row.Weight = Number(e.target.value);
                }
              }}
              defaultValue={el.Weight}
              label="Weight"
              type="number"
              sx={{ width: 200 }}
            />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
});
