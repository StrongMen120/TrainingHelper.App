import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import { Instance } from 'mobx-state-tree';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';

export const StatisticsCharts: FC<{
  plansRoot: Instance<typeof PlansRoot>;
  data: any[];
}> = observer(({ plansRoot, data }) => {
  if (plansRoot.isLoadingStatistics)
    return (
      <Stack height="70%" spacing={2} alignItems="center">
        <Box sx={{ width: '80%' }}>
          <LinearProgress />
        </Box>
      </Stack>
    );
  if (data.length === 0) {
    return (
      <Stack height="70%" spacing={2} alignItems="center">
        <Typography variant="h2" color={'blue'} sx={{ mt: 10 }}>
          No Data !!!
        </Typography>
      </Stack>
    );
  }
  return (
    <Stack>
      <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px' }}>
        <Grid item xs={6}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text={`Volume`} x={100} y={18} textAnchor="middle" style={{ fontSize: 16 }} />
            <VictoryLine
              data={data}
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '2px solid #ccc' },
              }}
              x="date"
              y="workoutVolume"
            />
            <VictoryAxis
              label="Day"
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: 'grey', size: 5 },
                tickLabels: { fontSize: 7, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Volume kg"
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: 'grey', size: 5 },
                tickLabels: { fontSize: 7, padding: 2 },
              }}
            />
          </VictoryChart>
        </Grid>
        <Grid item xs={6}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLabel text={`Intensity`} x={100} y={18} textAnchor="middle" style={{ fontSize: 16 }} />
            <VictoryLine
              data={data}
              x="date"
              y="workoutIntensity"
              style={{
                data: { stroke: '#3178c4' },
                parent: { border: '2px solid #ccc' },
              }}
            />
            <VictoryAxis
              label="Day"
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: 'grey', size: 5 },
                tickLabels: { fontSize: 7, padding: 5 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Intensity %"
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: 'grey', size: 5 },
                tickLabels: { fontSize: 7, padding: 2 },
              }}
            />
          </VictoryChart>
        </Grid>
      </Grid>
    </Stack>
  );
});
