import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, CardContent, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { usePlansRoot } from 'src/modules/plans/context/PlansContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { usePlansModals } from 'src/modules/plans/modals';
import { SeriesInfo } from '../doneExercise/TreeViewDoneExercise';

export const PlansDetailsExercise: React.FC<{
  plannedExercise: PlannedExercisesView[];
  onAdd: (newPlannedExercise: PlannedExercisesView) => void;
  onEdit: (editPlannedExercise: PlannedExercisesView) => void;
  onRemove: (identifier: string) => void;
}> = observer(({ plannedExercise, onAdd, onEdit, onRemove }) => {
  const plansRoot = usePlansRoot();
  const { removedExerciseFromPlan, addExerciseToPlan } = usePlansModals().plansModals;
  const [openProduct, setOpenProduct] = useState<string | null>(null);

  const handleOpenProduct = (productId: string): void => {
    setOpenProduct((prevValue) => (prevValue === productId ? null : productId));
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width="5%" />
              <TableCell width="35%">Exercise</TableCell>
              <TableCell width="10%">Series</TableCell>
              <TableCell width="10%">Rate</TableCell>
              <TableCell width="10%">RPE</TableCell>
              <TableCell width="20%">Brake Seconds</TableCell>
              <TableCell width="10%" align="right">
                <Button
                  variant="outlined"
                  onClick={() => {
                    plansRoot.setSelectedPlanExercise('');
                    addExerciseToPlan.open(async (result) => {
                      onAdd({
                        ExerciseId: result.exerciseId,
                        BrakeSeconds: result.brake,
                        Rate: result.rate,
                        RPE: result.rpe,
                        Series: result.series,
                        SeriesInfo: result.seriesInfo,
                        Identifier: 'NEW_' + new Date().getTime(),
                      });
                      return true;
                    });
                  }}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plannedExercise.map((exercise) => {
              const open = exercise.Identifier === openProduct;

              return (
                <Fragment key={exercise.Identifier}>
                  <TableRow hover key={exercise.Identifier}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }),
                      }}
                      width="5%"
                    >
                      <IconButton onClick={() => handleOpenProduct(exercise.Identifier)}>
                        {open ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                      </IconButton>
                    </TableCell>
                    <TableCell width="35%">{plansRoot.getExerciseById(exercise.ExerciseId)?.name}</TableCell>
                    <TableCell width="10%">{exercise.Series}</TableCell>
                    <TableCell width="10%">{exercise.Rate}</TableCell>
                    <TableCell width="10%">{exercise.RPE}</TableCell>
                    <TableCell width="20%">{exercise.BrakeSeconds}</TableCell>
                    <TableCell width="10%" align="right">
                      <Stack color="primary" direction="row" alignItems="center">
                        <IconButton
                          onClick={() => {
                            plansRoot.setSelectedPlanExercise(exercise.Identifier);
                            addExerciseToPlan.open(async (result) => {
                              onEdit({
                                ExerciseId: result.exerciseId,
                                BrakeSeconds: result.brake,
                                Rate: result.rate,
                                RPE: result.rpe,
                                Series: result.series,
                                SeriesInfo: result.seriesInfo,
                                Identifier: result.identifier,
                              });
                              return true;
                            });
                          }}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            removedExerciseFromPlan.open(async (result) => {
                              onRemove(exercise.Identifier);
                              return true;
                            });
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                              <Grid container spacing={3}>
                                {exercise.SeriesInfo.map((series) => {
                                  return (
                                    <Grid item md={12} xs={12}>
                                      <Stack color="primary" direction="row" alignItems="center">
                                        <Stack direction="row" ml={5} spacing={0.1} alignItems="center" width="100%">
                                          <Stack direction="row" alignItems="center" width="20%"></Stack>
                                          <Stack direction="row" alignItems="center" width="20%" color={'blue'}>
                                            {series.Id}
                                          </Stack>
                                          <Stack direction="row" alignItems="center" width="20%">
                                            {series.Reps}
                                          </Stack>
                                          <Stack direction="row" alignItems="center" width="20%">
                                            {series.Weight}
                                          </Stack>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" width="20%"></Stack>
                                      </Stack>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
});
export type PlannedExercisesView = {
  Identifier: string;
  ExerciseId: number;
  Series: number;
  Rate: number;
  RPE: number;
  BrakeSeconds: number;
  SeriesInfo: SeriesInfo[];
};
