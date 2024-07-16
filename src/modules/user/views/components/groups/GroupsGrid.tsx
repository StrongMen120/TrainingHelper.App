import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { GroupsTableColumns } from '../columns/GroupsTableColumns';
import { useUserManagementsModals } from 'src/modules/user/context/modals';

export const GroupsGrid: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  const { addGroupModal } = useUserManagementsModals().groupModals;
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={root.groups}
        columns={GroupsTableColumns(root)}
        loading={root.isLoadingGroup}
        hideFooter={true}
        components={{
          Toolbar: () => (
            <DataGridToolbarCustom>
              <Button
                onClick={() => {
                  addGroupModal.open(async (result) => {
                    root.fetchCreateGroup({ name: result.name, trainerId: result.trainerId });
                    return true;
                  });
                }}
                endIcon={<AddCircleIcon fontSize="small" />}
                style={{ margin: 4 }}
                variant="outlined"
              >
                Add New Group
              </Button>
            </DataGridToolbarCustom>
          ),
        }}
      />
    </Box>
  );
});
