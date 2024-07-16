import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/user/views/pages/groups'), {
  ssr: false,
});

const GroupsPage: NestedNextPage = () => {
  return <Content />;
};

GroupsPage.getLayout = UsersLayoutRenderer;

export default GroupsPage;
