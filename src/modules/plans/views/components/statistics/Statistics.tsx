import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC, useState } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Divider, Stack } from '@mui/material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { Routes } from 'src/routes';
import { StatisticsCharts } from './StatisticsCharts';
import { StatisticsInputs } from './StatisticsInputs';

export const Statistics: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  const [exerciseId, setExerciseId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(userRoot.loginUserId);
  const [date, setDate] = useState<Date>(new Date());
  function onChangeDate(params: Date) {
    setDate(params);
  }
  function onChangeExercise(params: number) {
    setExerciseId(params);
  }
  function onChangeUser(params: number) {
    setUserId(params);
  }
  function onSubmit() {
    plansRoot.fetchExerciseStatistics(userId, exerciseId, date.getFullYear(), date.getMonth() + 1);
  }
  return (
    <Stack sx={{ height: '100%', width: '100%' }}>
      <CommonHeader headerTitle="Statistics" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Exercise' }, { name: 'Statistics', href: Routes.exercise.records }]} />} />
      <Divider />
      <StatisticsInputs
        plansRoot={plansRoot}
        userRoot={userRoot}
        date={date}
        onChangeDate={onChangeDate}
        onChangeExercise={onChangeExercise}
        onChangeUser={onChangeUser}
        onSubmit={onSubmit}
      />
      <StatisticsCharts plansRoot={plansRoot} data={plansRoot.getStatisticsByExerciseIdAndUserId(exerciseId, userId)} />
    </Stack>
  );
});
