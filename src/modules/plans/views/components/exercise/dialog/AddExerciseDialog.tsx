import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, Grid, MenuItem, TextField } from '@mui/material';
import { BodyElements } from '@trainerhelper/plans-api';
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
    name: yup.string().required('Field is required!'),
    description: yup.string().required('Field is required!'),
  })
  .required();

const AddExerciseDialog: FC<{ root: Instance<typeof PlansRoot> }> = observer(({ root }) => {
  const { addExerciseModal } = usePlansModals().exerciseModals;
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <Dialog open={addExerciseModal.isOpen} fullWidth maxWidth="sm" onClose={() => addExerciseModal.close('clickAway')}>
      <form
        onSubmit={handleSubmit((values) => {
          addExerciseModal.submitAndClose({
            name: values.name,
            bodyElements: values.bodyElements,
            description: values.description,
          });
        })}
      >
        <ModalTitle onClose={() => addExerciseModal.close('clickAway')} variant="h5">
          Add New Exercise
        </ModalTitle>
        <ModalContent sx={{ px: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue={null}
                render={({ field, fieldState: { error } }) => (
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} label="Name" multiline error={!!error} helperText={error?.message} {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue={null}
                render={({ field, fieldState: { error } }) => (
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} label="Description" error={!!error} helperText={error?.message} {...field} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="bodyElements"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <TextField
                    select
                    fullWidth
                    value={value ?? []}
                    label="BodyElements"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    SelectProps={{
                      multiple: true,
                    }}
                  >
                    <MenuItem value={BodyElements.Biceps}>{BodyElements.Biceps}</MenuItem>
                    <MenuItem value={BodyElements.Brzuch}>{BodyElements.Brzuch}</MenuItem>
                    <MenuItem value={BodyElements.KlatkaPiersiowa}>{BodyElements.KlatkaPiersiowa}</MenuItem>
                    <MenuItem value={BodyElements.Nogi}>{BodyElements.Nogi}</MenuItem>
                    <MenuItem value={BodyElements.Plecy}>{BodyElements.Plecy}</MenuItem>
                    <MenuItem value={BodyElements.Poladki}>{BodyElements.Poladki}</MenuItem>
                    <MenuItem value={BodyElements.Triceps}>{BodyElements.Triceps}</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          <Button variant="contained" onClick={() => addExerciseModal.close('cancel')} color="inherit" sx={{ mr: 1 }}>
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

export default AddExerciseDialog;
