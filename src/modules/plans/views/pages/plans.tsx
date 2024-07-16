import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { usePlansRoot } from '../../context/PlansContext';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { Plans } from '../components/plans/Plans';
import RemovedPlanDialog from '../components/plans/Dialog/RemovedPlanDialog';
import { Box, LinearProgress, Stack } from '@mui/material';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    plansRoot.fetchAllPlansUser(userRoot.loginUserId);
    plansRoot.fetchAllExercise();
  });
  if (plansRoot.isLoadingPlans)
    return (
      <Stack height="70%" spacing={2} alignItems="center">
        <Box sx={{ width: '80%' }}>
          <LinearProgress />
        </Box>
      </Stack>
    );
  return (
    <ViewWrapper>
      <Plans root={plansRoot} />
      <RemovedPlanDialog plansRoot={plansRoot} />
    </ViewWrapper>
  );
});

export default RootView;
