import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { usePlansRoot } from '../../context/PlansContext';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Statistics } from '../components/statistics/Statistics';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    userRoot.fetchAllUsers();
    plansRoot.fetchAllExercise();
    plansRoot.fetchAllRecordsExerciseToUser(userRoot.loginUserId);
  });
  return (
    <ViewWrapper>
      <Statistics plansRoot={plansRoot} userRoot={userRoot}></Statistics>
    </ViewWrapper>
  );
});

export default RootView;
