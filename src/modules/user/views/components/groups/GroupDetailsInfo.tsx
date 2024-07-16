import { Instance } from 'mobx-state-tree';
import React, { useState } from 'react';
import { Autocomplete, List, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { CommonSectionHeader } from 'src/common/components/CommonSectionHeader';
import { Controller, useForm } from 'react-hook-form';
import { FormListItemEdit } from 'src/common/components/FormListItemEdit';
import { FormListItem } from 'src/common/components/FormListItem';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Section } from 'src/common/components/Section';
import { SectionControlButtons } from 'src/common/components/SectionControlButtons';
import GroupVM from 'src/modules/user/view-model/group';

const schema = yup
  .object({
    name: yup.string().required('Pole jest wymagane !'),
    trainer: yup.string().required('Pole jest wymagane !'),
  })
  .required();

export const GroupDetailsInfo: React.FC<{ group: Instance<typeof GroupVM>; hasPermission: boolean }> = observer(({ group, hasPermission }) => {
  const root = useUsersManagementsRoot();
  const [editMode, setEditMode] = useState(false);
  const { handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <Section
      header={
        <CommonSectionHeader headerTitle="Groups Details">
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
                root.fetchUpdateGroup({
                  name: values.name,
                  trainerId: values.trainer,
                  identifier: group.id,
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
              defaultValue={group.name}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Name Group">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="trainer"
              control={control}
              defaultValue={group.trainer.identifier}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                  <FormListItemEdit label="Trainer">
                    <Autocomplete
                      size="small"
                      options={root.users}
                      value={value ? root.getUserById(value) : null}
                      getOptionLabel={(options) => {
                        return `[${options.id}] ${options.firstName}  ${options.secondName}`;
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
                  </FormListItemEdit>
                );
              }}
            />
          </>
        ) : (
          <List>
            <FormListItem label="Name Group" value={group.name} />
            <FormListItem label="Trainer" value={group.trainer.firstName + ' ' + group.trainer.secondName} />
          </List>
        )}
      </List>
    </Section>
  );
});
