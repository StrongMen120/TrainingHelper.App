import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Save as SaveIcon } from '@mui/icons-material';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Button, Divider, FormControlLabel, Grid, List, ListItem, ListItemText, Paper, Radio, RadioGroup, Stack, Switch, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormListItemEdit } from 'src/common/components/FormListItemEdit';
import { DesktopDatePicker } from '@mui/x-date-pickers-pro';
import { Instance } from 'mobx-state-tree';
import { UsersRoot } from '../../view-model/user-managment-root';
import { SexTypeDto } from '@trainerhelper/users-api';
import { toLocalDate } from 'src/utils/date-utils';

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

const RegisterUserPage: FC<{ context: Instance<typeof UsersRoot> }> = observer(({ context }) => {
  const { handleSubmit, control } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Paper elevation={5}>
          <Stack width="100%">
            <Stack justifyContent="space-between" alignItems="center" my={2} mx={3} direction="row">
              <Typography variant="h1">Welcom on Training Helper App ! </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack width="100%">
            <Stack justifyContent="space-between" alignItems="center" my={2} mx={3} direction="row">
              <Typography variant="h5">Before you start, you need to provide some basic information!</Typography>
            </Stack>
          </Stack>
          <Divider />
          <List disablePadding>
            <Controller
              name="firstName"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="First Name">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="secondName"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Second Name">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Email">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Phone">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="weight"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Weight">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} InputProps={{ endAdornment: 'kg' }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="height"
              control={control}
              defaultValue={null}
              render={({ field, fieldState: { error } }) => (
                <FormListItemEdit label="Height">
                  <TextField fullWidth size="small" InputLabelProps={{ shrink: true }} InputProps={{ endAdornment: 'cm' }} error={!!error} helperText={error?.message} {...field} />
                </FormListItemEdit>
              )}
            />
            <Controller
              name="sex"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormListItemEdit label="Sex">
                  <RadioGroup row>
                    <FormControlLabel value={SexTypeDto.Woman} control={<Radio />} label="Woman" onChange={onChange} />
                    <FormControlLabel value={SexTypeDto.Mean} control={<Radio />} label="Mean" onChange={onChange} />
                  </RadioGroup>
                </FormListItemEdit>
              )}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue={null}
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
          </List>
          <Divider />
          <Stack spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit((values) => {
                context.fetchCreateUser({
                  firstName: values.firstName,
                  secondName: values.secondName,
                  email: values.email,
                  birthday: toLocalDate(values.birthday),
                  height: values.height,
                  phone: values.phone,
                  sex: values.sex,
                  weight: values.weight,
                });
              })}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
});

export default RegisterUserPage;
