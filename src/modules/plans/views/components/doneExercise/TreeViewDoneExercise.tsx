import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView, TreeItem } from '@mui/lab';
import { Box, Container, LinearProgress, Stack } from '@mui/material';
import { Instance } from 'mobx-state-tree';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { TreeDoneExerciseView } from './TreeDoneExerciseView';
import { TreeDateView } from './TreeDateView';
import { TreeSeriesInfo } from './TreeSeriesInfo';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

const TreeViewDoneExercise: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  if (plansRoot.isLoadingDoneExercise || plansRoot.isLoadingExercise)
    return (
      <Stack height="70%" spacing={2} alignItems="center">
        <Box sx={{ width: '80%' }}>
          <LinearProgress />
        </Box>
      </Stack>
    );
  return (
    <Container maxWidth="xl" sx={{ overflow: 'auto', height: '100%' }}>
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />} sx={{ flex: 1 }}>
        {plansRoot.getTreeRows(plansRoot.doneExerciseUserId === 0 ? userRoot.loginUserId : plansRoot.doneExerciseUserId).map((row) => (
          <TreeItem label={<TreeDateView isLoading={true} dayDoneExercise={row}></TreeDateView>} nodeId={`date:${row.Id}`} key={row.Id}>
            {row.DoneExercises.map((doneExercise) => {
              return (
                <TreeItem
                  nodeId={`r:${row.Id}_doneExerciseId:${doneExercise.Identifier}`}
                  key={doneExercise.ExerciseId}
                  label={<TreeDoneExerciseView doneExercise={doneExercise} />}
                >
                  {doneExercise.SeriesInfo.map((series) => {
                    return (
                      <TreeItem
                        nodeId={`r:${row.Id}_doneExerciseId:${doneExercise.Identifier}_series:${series.Id}`}
                        key={series.Id}
                        label={<TreeSeriesInfo seriesInfo={series} />}
                      />
                    );
                  })}
                </TreeItem>
              );
            })}
          </TreeItem>
        ))}
      </TreeView>
    </Container>
  );
});

export default TreeViewDoneExercise;

export type DoneExerciseDay = {
  Id: number;
  Date: Date;
  DoneExercises: DoneExercisesView[];
};
export type DoneExercisesView = {
  Identifier: string;
  ExerciseId: number;
  ExerciseName: string;
  Series: number;
  Rate: number | null;
  BrakeSeconds: number | null;
  SeriesInfo: SeriesInfo[];
};
export type SeriesInfo = {
  Id: number;
  Reps: number;
  Weight: number;
};
