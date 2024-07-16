import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/user/views/pages/profile'), {
  ssr: false,
});

const ProfilePage: NestedNextPage = () => {
  return <Content />;
};

ProfilePage.getLayout = UsersLayoutRenderer;

export default ProfilePage;
