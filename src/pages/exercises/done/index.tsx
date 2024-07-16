import dynamic from 'next/dynamic';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { UsersLayoutRenderer } from 'src/modules/user/views/layouts/UserLayout';

const Content = dynamic(() => import('../../../modules/plans/views/pages/done-exercise'), {
  ssr: false,
});

const DoneExercisePage: NestedNextPage = () => {
  return <Content />;
};

DoneExercisePage.getLayout = UsersLayoutRenderer;

export default DoneExercisePage;
