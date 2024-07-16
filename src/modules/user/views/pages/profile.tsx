import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Stack } from '@mui/material';
import { PageContentWrapper } from 'src/common/components/PageContentWrapper';
import { ProfileDetails } from '../components/profile/ProfileDetails';
import { ViewWrapper } from 'src/common/components/ViewWrapper';

const RootView: FC = observer(() => {
  const root = useUsersManagementsRoot();
  return (
    <PageContentWrapper>
      <Stack height="100%">
        <ProfileDetails root={root} />
      </Stack>
    </PageContentWrapper>
  );
});

export default RootView;
