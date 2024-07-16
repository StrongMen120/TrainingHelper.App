import dynamic from 'next/dynamic';
import { NestedNextPage } from '../../common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../modules/plans/views/pages/dashboard'), {
  ssr: false,
});

const Dashboard: NestedNextPage = () => {
  return <Content />;
};

Dashboard.getLayout = UsersLayoutRenderer;

export default Dashboard;
