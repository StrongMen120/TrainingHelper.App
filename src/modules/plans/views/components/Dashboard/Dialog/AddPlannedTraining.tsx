import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Dialog, Grid, MenuItem, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers-pro';
import { PlansType } from '@trainerhelper/plans-api';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ModalActions, ModalContent, ModalTitle } from 'src/common/components/modals';
import { usePlansModals } from 'src/modules/plans/modals';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Routes } from 'src/routes';
import * as yup from 'yup';

const schema = yup
  .object({
    plansId: yup.number().required('Field is required!'),
    plansType: yup.string().required('Field is required!'),
    dateStart: yup.date().required('Field is required!'),
    dateEnd: yup.date().required('Field is required!'),
    userId: yup.number().nullable(),
    trainerId: yup.number().nullable(),
    groupId: yup.number().nullable(),
  })
  .shape({
    dateStart: yup.date(),
    dateEnd: yup.date().min(yup.ref('dateStart'), "End Date can't be before start date"),
  })
  .required();

const AddPlannedTraining: FC<{ userRoot: Instance<typeof UsersRoot>; plansRoot: Instance<typeof PlansRoot> }> = observer(({ userRoot, plansRoot }) => {
  const { addPlannedTraining } = usePlansModals().planedTraining;
  const [planType, setPlanType] = useState<PlansType>(PlansType.Individual);
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const editPlans = plansRoot.selectedPlannedTraining;
  if (editPlans) {
    setValue('plansId', editPlans.plansId);
    setValue('plansType', editPlans.plansType);
    setValue('dateStart', editPlans.dateStart);
    setValue('dateEnd', editPlans.dateEnd);
    setValue('userId', editPlans.userId);
    setValue('trainerId', editPlans.trainerId);
    setValue('groupId', editPlans.groupId);
  }
  return (
    <Dialog open={addPlannedTraining.isOpen} onClose={() => addPlannedTraining.close('clickAway')} fullWidth maxWidth="sm">
      <form
        onSubmit={handleSubmit((values) => {
          addPlannedTraining.submitAndClose({
            dateEnd: values.dateEnd,
            dateStart: values.dateStart,
            groupId: values.groupId,
            plansId: values.plansId,
            plansType: values.plansType,
            trainerId: values.trainerId,
            userId: values.userId,
          });
        })}
      >
        <ModalTitle onClose={() => addPlannedTraining.close('clickAway')} variant="h5">
          {editPlans ? 'Edit Planned Training' : 'Add Planned Training'}
        </ModalTitle>
        <ModalContent sx={{ px: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="plansId"
                control={control}
                defaultValue={editPlans ? editPlans.plansId : null}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                  return (
                    <Autocomplete
                      size="small"
                      value={value ? plansRoot.getPlansById(value) : null}
                      options={plansRoot.plans}
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
                          label="Plans"
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
              {userRoot.checkIsAdmin() || userRoot.checkIsAdmin() ? (
                <Controller
                  name="plansType"
                  control={control}
                  defaultValue={editPlans ? editPlans.plansType : null}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextField
                      select
                      fullWidth
                      value={value}
                      label="Plans Type"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      error={!!error}
                      helperText={error?.message}
                      onChange={(e) => {
                        onChange(e);
                        setPlanType(e.target.value as PlansType);
                      }}
                      onBlur={onBlur}
                    >
                      <MenuItem value={PlansType.Group}>{PlansType.Group}</MenuItem>
                      <MenuItem value={PlansType.Individual}>{PlansType.Individual}</MenuItem>
                      <MenuItem value={PlansType.Personal}>{PlansType.Personal}</MenuItem>
                    </TextField>
                  )}
                />
              ) : (
                <Controller
                  name="plansType"
                  control={control}
                  defaultValue={editPlans ? editPlans.plansType : null}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextField
                      select
                      fullWidth
                      value={value}
                      label="Plans Type"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      error={!!error}
                      helperText={error?.message}
                      onChange={(e) => {
                        onChange(e);
                        setPlanType(e.target.value as PlansType);
                      }}
                      onBlur={onBlur}
                    >
                      <MenuItem value={PlansType.Individual}>{PlansType.Individual}</MenuItem>
                    </TextField>
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dateStart"
                control={control}
                defaultValue={editPlans ? editPlans.dateStart : new Date()}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <DateTimePicker
                    onChange={onChange}
                    value={value}
                    label="Date Start"
                    inputFormat="dd.MM.yyyy HH:mm:ss"
                    mask="__.__.____ __:__:__"
                    renderInput={(props) => <TextField fullWidth size="small" {...props} onBlur={onBlur} error={!!error} helperText={error?.message} />}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dateEnd"
                control={control}
                defaultValue={editPlans ? editPlans.dateEnd : new Date()}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <DateTimePicker
                    onChange={onChange}
                    value={value}
                    label="Date End"
                    inputFormat="dd.MM.yyyy HH:mm:ss"
                    mask="__.__.____ __:__:__"
                    renderInput={(props) => <TextField fullWidth size="small" {...props} onBlur={onBlur} error={!!error} helperText={error?.message} />}
                  />
                )}
              />
            </Grid>
            {planType === PlansType.Group || planType === PlansType.Personal ? (
              <Grid item xs={12}>
                <Controller
                  name="trainerId"
                  control={control}
                  defaultValue={editPlans ? editPlans.trainerId : null}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        size="small"
                        options={userRoot.trainers}
                        value={value ? userRoot.getUserById(value) : null}
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
            ) : null}
            {planType === PlansType.Individual || planType === PlansType.Personal ? (
              <Grid item xs={12}>
                <Controller
                  name="userId"
                  control={control}
                  defaultValue={editPlans ? editPlans.userId : null}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        size="small"
                        options={userRoot.checkIsAdmin() || userRoot.checkIsAdmin() ? userRoot.users : [userRoot.loginUser!]}
                        value={value ? userRoot.getUserById(value) : null}
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
                            label="Users"
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
            ) : null}
            {planType === PlansType.Group ? (
              <Grid item xs={12}>
                <Controller
                  name="groupId"
                  control={control}
                  defaultValue={editPlans ? editPlans.groupId : null}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                      <Autocomplete
                        size="small"
                        options={userRoot.groups}
                        value={value ? userRoot.getGroupById(value) : null}
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
                            label="Groups"
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
            ) : null}
          </Grid>
        </ModalContent>
        <ModalActions sx={{ px: 2 }}>
          {editPlans && (
            <Button
              variant="contained"
              onClick={() => {
                router.push(`/${Routes.dashboard.startPlan}/${editPlans.plansId}`);
              }}
              color="success"
              sx={{ mr: 1 }}
            >
              Start
            </Button>
          )}
          {plansRoot.selectedPlannedTrainings && (
            <Button
              variant="contained"
              onClick={() => {
                plansRoot.fetchDeletePlannedTraining(plansRoot.selectedPlannedTrainings);
                addPlannedTraining.close('close');
              }}
              color="error"
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
          )}
          <Button variant="contained" onClick={() => addPlannedTraining.close('cancel')} color="inherit" sx={{ mr: 1 }}>
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

export default AddPlannedTraining;
