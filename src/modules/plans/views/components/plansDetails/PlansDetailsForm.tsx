import { Divider, Grid, List, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import { OneCreatedPlannedExerciseCommand, OneUpdatedPlannedExerciseCommand, PlansImage } from '@trainerhelper/plans-api';
import PlanVM from 'src/modules/plans/view-model/plans';
import { Instance } from 'mobx-state-tree';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormListItemEdit } from 'src/common/components/FormListItemEdit';
import { PlansDetailsImage } from './PlansDetailsImage';
import { PlannedExercisesView, PlansDetailsExercise } from './PlansDetailsExercise';
import { PlansDetailsHeader } from './PlansDetailsHeader';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import AddExerciseToPlanDialog from './Dialog/AddExerciseToPlanDialog';
import RemovedExerciseFromPlanDialog from './Dialog/RemovedExerciseFromPlanDialog';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Routes } from 'src/routes';
import { useRouter } from 'next/router';

const schema = yup
  .object({
    name: yup.string().required('Pole jest wymagane !'),
    description: yup.string().required('Pole jest wymagane !'),
  })
  .required();

export const PlansDetailsForm: React.FC<{ planDetails: Instance<typeof PlanVM> | undefined; plansRoot: Instance<typeof PlansRoot> }> = observer(({ planDetails, plansRoot }) => {
  const userRoot = useUsersManagementsRoot();
  const router = useRouter();
  const [selectedImg, setSelectedImg] = useState<PlansImage>(planDetails ? planDetails.image : PlansImage.Monday);
  const [plannedExercise, setPlannedExercise] = useState<PlannedExercisesView[]>(planDetails ? plansRoot.getAllExercisesToPlanById(planDetails!.id) : []);
  const { handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const handleImgChange = (newImage: PlansImage): void => {
    setSelectedImg(newImage);
  };
  const handleAddExercise = (newPlannedExercise: PlannedExercisesView): void => {
    setPlannedExercise((plannedExercise) => [...plannedExercise, newPlannedExercise]);
  };
  const handleEditExercise = (editPlannedExercise: PlannedExercisesView): void => {
    const index = plannedExercise.findIndex((obj) => obj.Identifier == editPlannedExercise.Identifier);
    const newPlannedExercise = plannedExercise;
    newPlannedExercise[index] = editPlannedExercise;
    setPlannedExercise(newPlannedExercise);
  };
  const handleRemoveExercise = (identifier: string): void => {
    setPlannedExercise(plannedExercise.filter((item) => item.Identifier !== identifier));
  };
  return (
    <Stack>
      <form
        onSubmit={handleSubmit((values) => {
          if (planDetails) {
            const rows: OneUpdatedPlannedExerciseCommand[] = [];
            plannedExercise.map((values) => {
              rows.push({
                exerciseInfoId: values.ExerciseId,
                brakeSeconds: values.BrakeSeconds ?? 0,
                rate: values.Rate ?? 0,
                rpe: values.RPE ?? 0,
                series: values.Series,
                reps: values.SeriesInfo.map((series) => series.Reps),
                weight: values.SeriesInfo.map((series) => series.Weight),
              });
            });
            plansRoot.fetchUpdatePlan(planDetails.identifier, { description: values.description, name: values.name, image: selectedImg, plannedExercise: rows });
          } else {
            const rows: OneCreatedPlannedExerciseCommand[] = [];
            plannedExercise.map((values) => {
              rows.push({
                exerciseInfoId: values.ExerciseId,
                brakeSeconds: values.BrakeSeconds ?? 0,
                rate: values.Rate ?? 0,
                rpe: values.RPE ?? 0,
                series: values.Series,
                reps: values.SeriesInfo.map((series) => series.Reps),
                weight: values.SeriesInfo.map((series) => series.Weight),
              });
            });
            plansRoot.fetchCreatePlan({ description: values.description, authorId: userRoot.loginUser!.id, name: values.name, image: selectedImg, plannedExercise: rows });
          }
          router.push(Routes.dashboard.plans);
        })}
      >
        <PlansDetailsHeader name={planDetails ? planDetails.name : 'New Plan'} />
        <Divider />
        <ViewWrapper>
          <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '2px' }}>
            <Grid item xs={5}>
              <List disablePadding>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={planDetails ? planDetails.name : ''}
                  render={({ field, fieldState: { error } }) => (
                    <FormListItemEdit label="Name Plan">
                      <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                    </FormListItemEdit>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={planDetails ? planDetails.description : ''}
                  render={({ field, fieldState: { error } }) => (
                    <FormListItemEdit label="Description">
                      <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                    </FormListItemEdit>
                  )}
                />
              </List>
              <PlansDetailsImage onImgClick={handleImgChange} selectedImg={selectedImg} />
            </Grid>
            <Grid item xs={7}>
              <PlansDetailsExercise plannedExercise={plannedExercise} onAdd={handleAddExercise} onEdit={handleEditExercise} onRemove={handleRemoveExercise} />
            </Grid>
          </Grid>
        </ViewWrapper>
      </form>
      <RemovedExerciseFromPlanDialog plansRoot={plansRoot} />
      <AddExerciseToPlanDialog plannedExercise={planDetails ? plansRoot.getExerciseToPlanById(planDetails.id, plansRoot.selectedPlanExercise) : undefined} />
    </Stack>
  );
});
