import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/user/views/pages/users'), {
  ssr: false,
});

const UsersPage: NestedNextPage = () => {
  return <Content />;
};

UsersPage.getLayout = UsersLayoutRenderer;

export default UsersPage;
