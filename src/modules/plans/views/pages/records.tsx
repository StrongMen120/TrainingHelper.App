import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { usePlansRoot } from '../../context/PlansContext';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Records } from '../components/records/Records';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    plansRoot.fetchAllExercise();
    plansRoot.fetchAllRecordsExerciseToUser(userRoot.loginUserId);
  });
  return (
    <ViewWrapper>
      <Records plansRoot={plansRoot} userRoot={userRoot}></Records>
    </ViewWrapper>
  );
});

export default RootView;
