import { Instance } from 'mobx-state-tree';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { CommonSectionHeader } from 'src/common/components/CommonSectionHeader';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { Section } from 'src/common/components/Section';
import GroupVM from 'src/modules/user/view-model/group';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { GroupsMembersTableColumns } from '../columns/GroupsMembersTableColumns';
import { useUserManagementsModals } from 'src/modules/user/context/modals';

export const GroupMembersInfo: React.FC<{ group: Instance<typeof GroupVM>; hasPermission: boolean }> = observer(({ group, hasPermission }) => {
  const root = useUsersManagementsRoot();
  const { addMembersToGroupModal } = useUserManagementsModals().groupModals;
  return (
    <Section header={<CommonSectionHeader headerTitle="Groups Members"></CommonSectionHeader>}>
      <Box sx={{ height: '300px', width: '100%', margin: '2px' }}>
        <DataGrid
          rows={root.membersCurrentGroup}
          columns={GroupsMembersTableColumns(root, root.checkIsAdmin(), root.loginUserId)}
          loading={root.isLoadingUsers}
          hideFooter={true}
          components={{
            Toolbar: () => (
              <DataGridToolbarCustom>
                {hasPermission ? (
                  <Button
                    onClick={() => {
                      addMembersToGroupModal.open(async (result) => {
                        root.fetchAddMembersToGroup({ groupId: group.id, userId: result.userId });
                        return true;
                      });
                    }}
                    endIcon={<AddCircleIcon fontSize="small" />}
                    style={{ margin: 4 }}
                    variant="outlined"
                  >
                    Add New Members
                  </Button>
                ) : (
                  <></>
                )}
              </DataGridToolbarCustom>
            ),
          }}
        />
      </Box>
    </Section>
  );
});
