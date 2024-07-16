import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/plans/views/pages/records'), {
  ssr: false,
});

const RecordsPage: NestedNextPage = () => {
  return <Content />;
};

RecordsPage.getLayout = UsersLayoutRenderer;

export default RecordsPage;
