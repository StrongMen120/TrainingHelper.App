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
    userId: yup.number().required('Field is required!'),
  })
  .required();

const AddMembersDialog: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  const { addMembersToGroupModal } = useUserManagementsModals().groupModals;
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <Dialog open={addMembersToGroupModal.isOpen} fullWidth maxWidth="sm" onClose={() => addMembersToGroupModal.close('clickAway')}>
      <form
        onSubmit={handleSubmit((values) => {
          addMembersToGroupModal.submitAndClose({
            userId: values.userId,
          });
        })}
      >
        <ModalTitle onClose={() => addMembersToGroupModal.close('clickAway')} variant="h5">
          Add Members To Group
        </ModalTitle>
        <ModalContent sx={{ px: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                  return (
                    <Autocomplete
                      size="small"
                      options={root.users}
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
                          label="User"
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
          </Grid>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          <Button variant="contained" onClick={() => addMembersToGroupModal.close('cancel')} color="inherit" sx={{ mr: 1 }}>
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

export default AddMembersDialog;
