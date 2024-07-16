import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC } from 'react';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Divider, Stack } from '@mui/material';
import { AllRecords } from './AllRecords';
import { HistoryRecords } from './HistoryRecords';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import AddRecordsDialog from './Dialog/AddRecordsDialog';
import { CommonBreadcrumbs } from 'src/common/components/CommonBreadcrumbs';
import { CommonHeader } from 'src/common/components/CommonHeader';
import { Routes } from 'src/routes';

export const Records: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  return (
    <Stack sx={{ height: '100%', width: '100%' }}>
      <CommonHeader headerTitle="Records" breadcrumbs={<CommonBreadcrumbs items={[{ name: 'Exercise' }, { name: 'Records', href: Routes.exercise.records }]} />} />
      <Divider />
      <AllRecords plansRoot={plansRoot} userRoot={userRoot} />
      <Divider />
      <HistoryRecords root={plansRoot} />
      <AddRecordsDialog plansRoot={plansRoot} />
    </Stack>
  );
});
