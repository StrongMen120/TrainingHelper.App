import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Grid } from '@mui/material';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { GroupsGrid } from '../components/groups/GroupsGrid';
import { GroupsDetails } from '../components/groups/GroupsDetails';
import AddGroupDialog from '../components/groups/Dialog/AddGroupDialog';
import AddMembersDialog from '../components/groups/Dialog/AddMembersDialog';
import { GroupPage } from '../components/groups/GroupPage';

const RootView: FC = observer(() => {
  const root = useUsersManagementsRoot();
  useEffect(() => {
    root.fetchAllUsers();
    root.fetchAllGroups();
  });
  return (
    <ViewWrapper>
      <GroupPage root={root} />
    </ViewWrapper>
  );
});

export default RootView;
