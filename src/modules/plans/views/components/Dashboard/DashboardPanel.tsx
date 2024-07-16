import { Paper, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { ViewCalendar } from './Calendar/ViewCalendar';
import AddPlannedTraining from './Dialog/AddPlannedTraining';

export const DashboardPanel: FC<{ userRoot: Instance<typeof UsersRoot>; plansRoot: Instance<typeof PlansRoot> }> = observer(({ userRoot, plansRoot }) => {
  return (
    <Stack height={'100%'}>
      <ViewCalendar userRoot={userRoot} plansRoot={plansRoot} />
      <AddPlannedTraining userRoot={userRoot} plansRoot={plansRoot}></AddPlannedTraining>
    </Stack>
  );
});
