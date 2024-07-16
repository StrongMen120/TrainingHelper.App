import { Box, Button, Chip, Divider, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { ChangeEvent, FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CommonSectionHeader } from 'src/common/components/CommonSectionHeader';
import { FormListItem } from 'src/common/components/FormListItem';
import { Section } from 'src/common/components/Section';
import { SectionControlButtons } from 'src/common/components/SectionControlButtons';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormListItemEdit } from 'src/common/components/FormListItemEdit';
import { BodyElements } from '@trainerhelper/plans-api';
import { isNil } from 'lodash';
import ExerciseVM from 'src/modules/plans/view-model/exercise';
import { usePlansRoot } from 'src/modules/plans/context/PlansContext';
import { usePlansModals } from 'src/modules/plans/modals';

const schema = yup
  .object({
    name: yup.string().required('Pole jest wymagane !'),
    description: yup.string().required('Pole jest wymagane !'),
  })
  .required();

export const ExerciseDetailsInfo: FC<{ exercise: Instance<typeof ExerciseVM> | undefined; hasPermission: boolean }> = observer(({ exercise, hasPermission }) => {
  const plansRoot = usePlansRoot();
  const { removeExerciseModal } = usePlansModals().exerciseModals;
  const [editMode, setEditMode] = useState(false);
  const { handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  if (isNil(exercise)) return null;
  return (
    <Box sx={{ height: '100%', width: '80%', margin: '2% 10% 2px 10%' }}>
      <ViewWrapper>
        <Stack justifyContent="space-between" spacing={1} my={3} direction="row">
          <Stack justifyContent="space-between">
            <Typography variant="h4">Exercise: {exercise?.name}</Typography>
            <Stack alignItems="center" spacing={2} direction="row">
              <Typography variant="body2">exercise_id:</Typography>
              <Chip label={exercise?.id} size="small" sx={{ fontSize: 12 }} />
              {hasPermission && (
                <>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        plansRoot.fetchUploadFiles(exercise.id, e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <Button component="span" color="success" variant="contained">
                      Add Photo
                    </Button>
                  </label>
                  <Button
                    component="span"
                    color="error"
                    variant="contained"
                    onClick={() =>
                      removeExerciseModal.open(async () => {
                        await plansRoot.fetchDeleteExercise(exercise.id);
                        return true;
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Section
          header={
            <CommonSectionHeader headerTitle="Exercise Details">
              <SectionControlButtons
                showSection={hasPermission}
                onCancel={() => {
                  setEditMode(false);
                  reset();
                }}
                onEdit={() => {
                  setEditMode(true);
                }}
                onSave={handleSubmit((values) => {
                  const isFormEdited = formState.isDirty;
                  if (isFormEdited) {
                    plansRoot.fetchUpdateExercise({
                      description: values.description,
                      name: values.name,
                      updatedId: exercise.id,
                      bodyElements: values.bodyElements,
                    });
                    setEditMode(false);
                  }
                })}
                editMode={editMode}
                saveDisabled={!formState.isDirty}
              />
            </CommonSectionHeader>
          }
        >
          <List disablePadding>
            {editMode ? (
              <>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={exercise?.name}
                  render={({ field, fieldState: { error } }) => (
                    <FormListItemEdit label="Name">
                      <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                    </FormListItemEdit>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue={exercise?.description}
                  render={({ field, fieldState: { error } }) => (
                    <FormListItemEdit label="Description">
                      <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                    </FormListItemEdit>
                  )}
                />
                <Controller
                  name="bodyElements"
                  control={control}
                  defaultValue={exercise?.bodyElements}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <FormListItemEdit label="Body Element">
                      <TextField
                        select
                        fullWidth
                        value={value}
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
                    </FormListItemEdit>
                  )}
                />
              </>
            ) : (
              <List>
                <FormListItem label="Name" value={exercise?.name} />
                <FormListItem label="Description" value={exercise?.description} />
                <FormListItem label="Body Element" value={exercise?.bodyElements?.toString()} />
              </List>
            )}
          </List>
        </Section>
      </ViewWrapper>
    </Box>
  );
});
