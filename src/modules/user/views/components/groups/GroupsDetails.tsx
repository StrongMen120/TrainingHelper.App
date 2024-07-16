import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Box, Divider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { GroupDetailsHeader } from './GroupDetailsHeader';
import { GroupInfo } from './GroupInfo';
import { RoomRounded } from '@mui/icons-material';

export const GroupsDetails: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  if (root.currentGroup === undefined)
    return (
      <Box sx={{ height: '100%', width: '100%', margin: '2px' }}>
        <></>
      </Box>
    );
  const isTrainerGroupOrAdmin: boolean = root.checkIsAdmin() || root.currentGroup.trainer.identifier === root.loginUserId;
  return (
    <Box sx={{ height: '100%', width: '100%', margin: '2px' }}>
      <ViewWrapper>
        <GroupDetailsHeader
          group={root.currentGroup}
          onDelete={() => {
            root.fetchDeleteGroup(root.currentGroup!.id);
          }}
          hasPermission={isTrainerGroupOrAdmin}
        />
        <Divider />
        <GroupInfo group={root.currentGroup} hasPermission={isTrainerGroupOrAdmin} />
      </ViewWrapper>
    </Box>
  );
});
