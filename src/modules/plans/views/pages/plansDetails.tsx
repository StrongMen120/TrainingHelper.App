import { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { usePlansRoot } from '../../context/PlansContext';
import { useRouter } from 'next/router';
import { PlansDetailsForm } from '../components/plansDetails/PlansDetailsForm';
import { isArray } from 'lodash';
import { ViewWrapper } from 'src/common/components/ViewWrapper';

const RootView: FC = observer(() => {
  const { query, back } = useRouter();
  const plansRoot = usePlansRoot();
  const planId = useMemo(() => (isArray(query['id']) ? query['id'][0] : query['id']), [query]);
  useEffect(() => {
    if (planId === undefined) {
      back();
    }
  }, [planId, back]);
  const planDetails = plansRoot.getPlansById(planId!);
  return (
    <ViewWrapper>
      <PlansDetailsForm planDetails={planDetails} plansRoot={plansRoot} />;
    </ViewWrapper>
  );
});

export default RootView;
