import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Dialog, Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers-pro';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalActions, ModalContent, ModalTitle } from 'src/common/components/modals';
import { useUserManagementsModals } from 'src/modules/user/context/modals';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Field is required!'),
    trainerId: yup.number().required('Field is required!'),
  })
  .required();

const AddGroupDialog: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  const { addGroupModal } = useUserManagementsModals().groupModals;
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <Dialog open={addGroupModal.isOpen} fullWidth maxWidth="sm" onClose={() => addGroupModal.close('clickAway')}>
      <form
        onSubmit={handleSubmit((values) => {
          addGroupModal.submitAndClose({
            name: values.name,
            trainerId: values.trainerId,
          });
        })}
      >
        <ModalTitle onClose={() => addGroupModal.close('clickAway')} variant="h5">
          Add New Group
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
            {root.checkIsAdmin() ? (
              <Grid item xs={12}>
                <Controller
                  name="trainerId"
                  control={control}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        size="small"
                        options={root.trainers}
                        value={null}
                        getOptionLabel={(options) => {
                          return `[${options.id}] ${options.firstName} ${options.secondName}`;
                        }}
                        onChange={(e, v) => {
                          onChange(v ? v.id : null);
                        }}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            onClick={(event) => event.stopPropagation()}
                            {...params}
                            label="Trainer"
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
            ) : (
              <Grid item xs={12}>
                <Controller
                  name="trainerId"
                  control={control}
                  defaultValue={root.loginUser!.id}
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      value={root.loginUser ? `[${root.loginUser.id}] ${root.loginUser.firstName} ${root.loginUser.secondName}` : ''}
                      fullWidth
                      size="small"
                      disabled
                      InputLabelProps={{ shrink: true }}
                      label="Trainer"
                      multiline
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          <Button variant="contained" onClick={() => addGroupModal.close('cancel')} color="inherit" sx={{ mr: 1 }}>
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

export default AddGroupDialog;
