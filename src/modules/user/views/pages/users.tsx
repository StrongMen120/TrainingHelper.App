import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthGuard } from 'src/common/guard/AuthGuard';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { UsersTableColumns } from '../components/columns/UsersTableColumns';
import { RoleTableColumns } from '../components/columns/RoleTableColumns';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import { UsersGrid } from '../components/users/UsersGrid';
import { UsersDetails } from '../components/users/UserDetails';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { UsersPage } from '../components/users/UsersPage';

const RootView: FC = observer(() => {
  const root = useUsersManagementsRoot();
  useEffect(() => {
    root.fetchAllUsers();
    root.fetchAllRoles();
    root.fetchAllGroups();
  });
  return (
    <ViewWrapper>
      <UsersPage root={root} />
    </ViewWrapper>
  );
});

export default RootView;
