import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { DatePicker } from '@mui/x-date-pickers-pro';
import SearchIcon from '@mui/icons-material/Search';

export const StatisticsInputs: FC<{
  plansRoot: Instance<typeof PlansRoot>;
  userRoot: Instance<typeof UsersRoot>;
  date: Date;
  onChangeDate: (params: Date) => void;
  onChangeExercise: (params: number) => void;
  onChangeUser: (params: number) => void;
  onSubmit: () => void;
}> = observer(({ plansRoot, userRoot, date, onChangeDate, onChangeExercise, onChangeUser, onSubmit }) => {
  return (
    <Stack>
      <Grid container spacing={2} sx={{ height: '100%', width: '100%', padding: '8px' }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <DatePicker
            onChange={(e) => {
              onChangeDate(e ?? new Date());
            }}
            value={date}
            label={'Date'}
            views={['month', 'year']}
            renderInput={(props) => <TextField fullWidth size="small" {...props} />}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            size="small"
            defaultValue={0}
            label="Select Exercise"
            sx={{ width: 300, mr: 5 }}
            onChange={(e) => {
              onChangeExercise(Number(e.target.value));
            }}
          >
            {plansRoot.exercises.map((exercise) => (
              <MenuItem key={exercise.identifier} value={exercise.identifier}>
                {`[${exercise.identifier}] ${exercise.name}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          {(userRoot.checkIsAdmin() || userRoot.checkIsTrainer()) && (
            <TextField
              select
              size="small"
              defaultValue={userRoot.loginUserId}
              label="Select User"
              sx={{ width: 300, mr: 5 }}
              onChange={(e) => {
                onChangeUser(Number(e.target.value));
              }}
            >
              {userRoot.users.map((user) => (
                <MenuItem key={user.identifier} value={user.identifier}>
                  {`[${user.identifier}] ${user.firstName} ${user.secondName}`}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={onSubmit} startIcon={<SearchIcon />}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
});
