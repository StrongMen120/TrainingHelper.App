import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { usePlansRoot } from '../../context/PlansContext';
import { DashboardPanel } from '../components/Dashboard/DashboardPanel';
import { ViewWrapper } from 'src/common/components/ViewWrapper';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    plansRoot.fetchAllPlannedTrainingsToUser(userRoot.loginUserId);
    plansRoot.fetchAllPlansUser(userRoot.loginUserId);
    userRoot.fetchAllUsers();
    userRoot.fetchAllGroups();
  });
  return (
    <ViewWrapper>
      <DashboardPanel plansRoot={plansRoot} userRoot={userRoot} />;
    </ViewWrapper>
  );
});

export default RootView;
