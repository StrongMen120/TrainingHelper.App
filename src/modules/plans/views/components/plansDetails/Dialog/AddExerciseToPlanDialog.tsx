import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Dialog, Grid, Stack, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalActions, ModalContent, ModalTitle } from 'src/common/components/modals';
import { usePlansModals } from 'src/modules/plans/modals';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import * as yup from 'yup';
import { SeriesInfo } from '../../doneExercise/TreeViewDoneExercise';
import { PlannedExercisesView } from '../PlansDetailsExercise';
import { usePlansRoot } from 'src/modules/plans/context/PlansContext';

const schema = yup
  .object({
    exerciseId: yup.number().required('Field is required!'),
    series: yup.number().required('Field is required!'),
    rate: yup.number().required('Field is required!'),
    rpe: yup.number().required('Field is required!'),
    brakeSeconds: yup.number().required('Field is required!'),
  })
  .required();

const AddExerciseToPlanDialog: FC<{ plannedExercise: PlannedExercisesView | undefined }> = observer(({ plannedExercise }) => {
  const plansRoot = usePlansRoot();
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    values: plannedExercise
      ? {
          exerciseId: plannedExercise.ExerciseId,
          series: plannedExercise.Series,
          rate: plannedExercise.Rate,
          rpe: plannedExercise.RPE,
          brakeSeconds: plannedExercise.BrakeSeconds,
        }
      : {},
    resolver: yupResolver(schema),
  });
  const { addExerciseToPlan } = usePlansModals().plansModals;
  const [rows, setRows] = useState<SeriesInfo[]>(plannedExercise ? plannedExercise.SeriesInfo : []);
  useEffect(() => {
    setRows(plannedExercise ? plannedExercise.SeriesInfo : []);
  }, [plannedExercise]);
  const setSeries = (series: number) => {
    const rowsSeries: SeriesInfo[] = [];
    for (let i = 0; i < series; i++) {
      rowsSeries.push({ Id: i + 1, Reps: 0, Weight: 0 });
    }
    setRows(rowsSeries);
  };

  return (
    <Dialog
      open={addExerciseToPlan.isOpen}
      fullWidth
      maxWidth="sm"
      onClose={() => {
        addExerciseToPlan.close('clickAway');
      }}
    >
      <form
        onSubmit={handleSubmit((values) => {
          reset();
          addExerciseToPlan.submitAndClose({
            identifier: plannedExercise ? plannedExercise.Identifier : '',
            brake: values.brakeSeconds!,
            seriesInfo: rows,
            exerciseId: values.exerciseId!,
            rate: values.rate!,
            rpe: values.rpe!,
            series: values.series!,
          });
        })}
      >
        <ModalTitle
          onClose={() => {
            reset();
            addExerciseToPlan.close('clickAway');
          }}
          variant="h5"
        >
          {plansRoot.selectedPlanExercise === '' ? 'Add  Exercise To Plan' : 'Edit  Exercise To Plan'}
        </ModalTitle>
        <ModalContent sx={{ px: 1 }}>
          <Stack height={'100%'}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="exerciseId"
                      control={control}
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                        return (
                          <Autocomplete
                            size="small"
                            value={value ? plansRoot.getExerciseById(value) : null}
                            options={plansRoot.exercises}
                            getOptionLabel={(options) => {
                              return `[${options.id}] ${options.name}`;
                            }}
                            onChange={(e, v) => {
                              onChange(v ? v.id : null);
                            }}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                onClick={(event) => event.stopPropagation()}
                                {...params}
                                label="Exercise"
                                variant="outlined"
                                onBlur={onBlur}
                                error={!!error}
                                helperText={error?.message}
                              />
                            )}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="series"
                      control={control}
                      render={({ field: { onBlur, value }, fieldState: { error } }) => (
                        <TextField
                          fullWidth
                          defaultValue={value}
                          onChange={(e) => {
                            setValue('series', Number(e.target.value));
                            setSeries(Number(e.target.value));
                          }}
                          onBlur={onBlur}
                          type="number"
                          size="small"
                          InputProps={{ inputProps: { min: 0, max: 10 } }}
                          InputLabelProps={{ shrink: true }}
                          label="Series"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="rate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          fullWidth
                          InputProps={{ inputProps: { min: 0, max: 9999 } }}
                          type="number"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          label="Rate"
                          error={!!error}
                          helperText={error?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="rpe"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          fullWidth
                          InputProps={{ inputProps: { min: 0, max: 12 } }}
                          type="number"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          label="RPE"
                          error={!!error}
                          helperText={error?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="brakeSeconds"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          fullWidth
                          type="number"
                          size="small"
                          InputProps={{ inputProps: { min: 0, max: 360 } }}
                          InputLabelProps={{ shrink: true }}
                          label="BrakeSeconds"
                          error={!!error}
                          helperText={error?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  {rows.map((el) => (
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" width={'100%'} height={50}>
                        <Typography variant="h4" flex={0.3} width={20} color={'blue'}>
                          {el.Id}
                        </Typography>
                        <TextField
                          onChange={(e) => {
                            const row = rows.find((r) => r.Id === el.Id);
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
                            const row = rows.find((r) => r.Id === el.Id);
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
              </Grid>
            </Grid>
          </Stack>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              reset();
              addExerciseToPlan.close('cancel');
            }}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </ModalActions>
      </form>
    </Dialog>
  );
});

export default AddExerciseToPlanDialog;
