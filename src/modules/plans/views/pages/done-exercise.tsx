import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { usePlansRoot } from '../../context/PlansContext';
import { DoneExerciseTreeView } from '../components/doneExercise/DoneExerciseTreeView';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    userRoot.fetchAllUsers();
    plansRoot.fetchAllExercise();
    plansRoot.fetchDoneExerciseToUser(userRoot.loginUserId);
  });
  return (
    <ViewWrapper>
      <DoneExerciseTreeView plansRoot={plansRoot} userRoot={userRoot} />
    </ViewWrapper>
  );
});

export default RootView;
