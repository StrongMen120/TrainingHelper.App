import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../modules/plans/views/pages/plansDetails'), {
  ssr: false,
});

const PlansPage: NestedNextPage = () => {
  return <Content />;
};

PlansPage.getLayout = UsersLayoutRenderer;

export default PlansPage;
