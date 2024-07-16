import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/plans/views/pages/statistics'), {
  ssr: false,
});

const StatisticsPage: NestedNextPage = () => {
  return <Content />;
};

StatisticsPage.getLayout = UsersLayoutRenderer;

export default StatisticsPage;
