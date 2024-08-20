import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { NestedNextPage } from 'src/common/utils/nested-components';
import { TrackerLayoutRenderer } from 'src/modules/dashboard/views/layouts/TrackerLayout';

const MainPage: NestedNextPage = () => {
  const router = useRouter();
  router.push('/tracker');
  return null;
};

MainPage.getLayout = TrackerLayoutRenderer;

export default MainPage;
