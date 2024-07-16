import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/plans/views/pages/exercise'), {
  ssr: false,
});

const ExercisePage: NestedNextPage = () => {
  return <Content />;
};

ExercisePage.getLayout = UsersLayoutRenderer;

export default ExercisePage;
