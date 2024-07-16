import { Instance } from 'mobx-state-tree';
import React, { useState } from 'react';
import { FormControlLabel, List, Radio, RadioGroup, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UserVM from 'src/modules/user/view-model/user';
import { observer } from 'mobx-react-lite';
import { CommonSectionHeader } from 'src/common/components/CommonSectionHeader';
import { Controller, useForm } from 'react-hook-form';
import { SexTypeDto } from '@trainerhelper/users-api';
import { FormListItemEdit } from 'src/common/components/FormListItemEdit';
import { FormListItem } from 'src/common/components/FormListItem';
import { DesktopDatePicker } from '@mui/x-date-pickers-pro';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { toLocalDate } from 'src/utils/date-utils';
import { Section } from 'src/common/components/Section';
import { SectionControlButtons } from 'src/common/components/SectionControlButtons';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup
  .object({
    firstName: yup.string().required('Pole jest wymagane !'),
    secondName: yup.string().required('Pole jest wymagane !'),
    email: yup.string().email('Nieprawidłowy adres e-mail').required('Pole jest wymagane !'),
    phone: yup.string().matches(phoneRegExp, 'Numer telefonu jest nieprawidłowy').required('Pole jest wymagane !'),
    weight: yup.number().required('Pole jest wymagane !'),
    height: yup.number().required('Pole jest wymagane !'),
    sex: yup.string().required('Pole jest wymagane !'),
    birthday: yup.date().required('Pole jest wymagane !'),
  })
  .required();

export const UserDetailsInfo: React.FC<{ user: Instance<typeof UserVM>; root: Instance<typeof UsersRoot> }> = observer(({ user, root }) => {
  const [editMode, setEditMode] = useState(false);
  const { handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <Section
      header={
        <CommonSectionHeader headerTitle="User Details">
          <SectionControlButtons
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
                root.fetchUpdateUser({
                  firstName: values.firstName,
                  secondName: values.secondName,
                  email: values.email,
                  birthday: toLocalDate(values.birthday),
                  height: values.height,
                  phone: values.phone,
                  sex: values.sex,
                  weight: values.weight,
                  identifier: user.identifier,
                });
                setEditMode(false);
              }
            })}
            editMode={editMode}
            saveDisabled={!formState.isDirty}
            showSection={false}
          />
        </CommonSectionHeader>
      }
    >
      <List disablePadding>
        {editMode ? (
          <>
            <Controller
              name="firstName"
              control={control}
              defaultValue={user.firstName}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="First Name">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="secondName"
              control={control}
              defaultValue={user.secondName}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Last Name">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={user.email}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="E-mail">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={user.phone}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Phone">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="weight"
              control={control}
              defaultValue={user.weight}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Weight">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} InputProps={{ endAdornment: 'kg' }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="height"
              control={control}
              defaultValue={user.height}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Height">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} InputProps={{ endAdornment: 'cm' }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="sex"
              control={control}
              defaultValue={user.sex}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormListItemEdit label="Sex">
                  <RadioGroup row value={value}>
                    <FormControlLabel value={SexTypeDto.Woman} control={<Radio />} label="Woman" onChange={onChange} />
                    <FormControlLabel value={SexTypeDto.Mean} control={<Radio />} label="Mean" onChange={onChange} />
                  </RadioGroup>
                </FormListItemEdit>
              )}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue={user.birthday}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormListItemEdit label="Birthday">
                  <DesktopDatePicker
                    inputFormat="dd.MM.yyyy"
                    mask="__.__.____"
                    onChange={onChange}
                    value={value}
                    renderInput={(props) => <TextField fullWidth size="small" {...props} error={!!error} helperText={error?.message} onBlur={onBlur} />}
                  />
                </FormListItemEdit>
              )}
            />
          </>
        ) : (
          <List>
            <FormListItem label="First Name" value={user.firstName} />
            <FormListItem label="Last Name" value={user.secondName} />
            <FormListItem label="E-mail" value={user.email} />
            <FormListItem label="Phone" value={user.phone} />
            <FormListItem label="Weight" value={user.weight} />
            <FormListItem label="Height" value={user.height} />
            <FormListItem label="Sex" value={user.sex.toString()} />
            <FormListItem label="Birthday" value={user.birthday} />
          </List>
        )}
      </List>
    </Section>
  );
});
