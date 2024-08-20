import dynamic from 'next/dynamic';
import { NestedNextPage } from '../../common/utils/nested-components';
import { TrackerLayoutRenderer } from 'src/modules/dashboard/views/layouts/TrackerLayout';

const Content = dynamic(() => import('../../modules/dashboard/views/pages/dashboard'), {
  ssr: false,
});

const Dashboard: NestedNextPage = () => {
  return <Content />;
};

Dashboard.getLayout = TrackerLayoutRenderer;

export default Dashboard;
