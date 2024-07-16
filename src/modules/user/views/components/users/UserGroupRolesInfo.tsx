import { Instance } from 'mobx-state-tree';
import React, { useState } from 'react';
import { Box, Button, Stack, Tab } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { GroupsTableColumns } from '../columns/GroupsTableColumns';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { RoleTableColumns } from '../columns/RoleTableColumns';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

export const UserGroupRolesInfo: React.FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  const [activeTab, setActiveTab] = useState('groups');
  function handleTabChange(event: React.ChangeEvent<{}>, newValue: string): void {
    setActiveTab(newValue);
  }
  return (
    <TabContext value={activeTab}>
      <TabList onChange={handleTabChange}>
        <Tab value="groups" label="Groups" />
        <Tab value="roles" label="Roles" />
      </TabList>
      <TabPanel value="groups">
        <Box sx={{ height: '300px', width: '100%', margin: '2px' }}>
          <DataGrid
            rows={root.groupsCurrentUser}
            columns={GroupsTableColumns(root, false)}
            loading={root.isLoadingUsers}
            hideFooter={true}
            components={{
              Toolbar: () => <DataGridToolbarCustom />,
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel value="roles">
        <Box sx={{ height: '300px', width: '100%', margin: '2px' }}>
          <DataGrid
            rows={root.rolesCurrentUser}
            columns={RoleTableColumns(root)}
            loading={root.isLoadingUsers}
            hideFooter={true}
            components={{
              Toolbar: () => (
                <DataGridToolbarCustom>
                  <Stack direction="row">
                    {!root.selectedUserIsAdmin() && (
                      <Button
                        onClick={() => {
                          root.createPermission(root.selectedUserId, 1);
                        }}
                        startIcon={<AddCircleIcon fontSize="small" />}
                        style={{ margin: 4 }}
                        variant="outlined"
                      >
                        Admin
                      </Button>
                    )}
                    {!root.selectedUserIsTrainer() && (
                      <Button
                        onClick={() => {
                          root.createPermission(root.selectedUserId, 2);
                        }}
                        startIcon={<AddCircleIcon fontSize="small" />}
                        style={{ margin: 4 }}
                        variant="outlined"
                      >
                        Trainer
                      </Button>
                    )}
                  </Stack>
                </DataGridToolbarCustom>
              ),
            }}
          />
        </Box>
      </TabPanel>
    </TabContext>
  );
});
