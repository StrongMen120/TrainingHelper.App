import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { usePlansRoot } from '../../context/PlansContext';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { Exercises } from '../components/exercise/Exercises';

const RootView: FC = observer(() => {
  const userRoot = useUsersManagementsRoot();
  const plansRoot = usePlansRoot();
  useEffect(() => {
    plansRoot.fetchAllExercise();
  });
  return (
    <ViewWrapper>
      <Exercises plansRoot={plansRoot} userRoot={userRoot} />
    </ViewWrapper>
  );
});

export default RootView;
