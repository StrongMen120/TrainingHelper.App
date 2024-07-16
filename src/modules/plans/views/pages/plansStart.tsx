import { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { usePlansRoot } from '../../context/PlansContext';
import { useRouter } from 'next/router';
import { isArray } from 'lodash';
import { PlansStart } from '../components/plansStart/PlansStart';
import { ViewWrapper } from 'src/common/components/ViewWrapper';

const RootView: FC = observer(() => {
  const { query, back } = useRouter();
  const plansRoot = usePlansRoot();
  const planId = useMemo(() => (isArray(query['id']) ? query['id'][0] : query['id']), [query]);
  useEffect(() => {
    plansRoot.fetchAllExercise();
    if (planId === undefined) {
      back();
    }
  }, [planId, back]);
  const planDetails = plansRoot.getPlansById(planId!);
  return planDetails ? (
    <ViewWrapper>
      <PlansStart planDetails={planDetails} plansRoot={plansRoot} />
    </ViewWrapper>
  ) : null;
});

export default RootView;
