import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const MainPage: NestedNextPage = () => {
  const router = useRouter();
  router.push('/dashboard');
  return null;
};

MainPage.getLayout = UsersLayoutRenderer;

export default MainPage;
