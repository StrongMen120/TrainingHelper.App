import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Dialog, Grid, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalActions, ModalContent, ModalTitle } from 'src/common/components/modals';
import { usePlansModals } from 'src/modules/plans/modals';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import * as yup from 'yup';

const schema = yup
  .object({
    exerciseId: yup.number().required('Field is required!'),
    weight: yup.number().required('Field is required!'),
    reps: yup.number().required('Field is required!'),
  })
  .required();

const AddRecordsDialog: FC<{ plansRoot: Instance<typeof PlansRoot> }> = observer(({ plansRoot }) => {
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const { addRecords } = usePlansModals().recordsModals;
  return (
    <Dialog
      open={addRecords.isOpen}
      fullWidth
      maxWidth="md"
      onClose={() => {
        addRecords.close('clickAway');
      }}
    >
      <form
        onSubmit={handleSubmit((values) => {
          reset();
          addRecords.submitAndClose({
            exerciseId: values.exerciseId,
            reps: values.reps,
            weight: values.weight,
          });
        })}
      >
        <ModalTitle
          onClose={() => {
            reset();
            addRecords.close('clickAway');
          }}
          variant="h5"
        >
          Add New Records
        </ModalTitle>
        <ModalContent sx={{ px: 1 }}>
          <Stack height={'100%'}>
            <Grid container spacing={4}>
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
                  name="reps"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 99 } }}
                      type="number"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      label="Reps"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 9999 } }}
                      type="number"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      label="Weight"
                      error={!!error}
                      helperText={error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              reset();
              addRecords.close('cancel');
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

export default AddRecordsDialog;
