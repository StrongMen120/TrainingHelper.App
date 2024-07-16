import { Button, Chip, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { Delete as DeleteIcon } from '@mui/icons-material';
import React from 'react';
import GroupVM from 'src/modules/user/view-model/group';

export const GroupDetailsHeader: React.FC<{ group: Instance<typeof GroupVM>; hasPermission: boolean; onDelete: () => void }> = observer(({ group, hasPermission, onDelete }) => {
  return (
    <Stack justifyContent="space-between" spacing={1} my={3} direction="row">
      <Stack justifyContent="space-between">
        <Typography variant="h4">Groups : {group.name}</Typography>
        <Typography variant="h5">Trainer : {group.trainer.firstName + ' ' + group.trainer.secondName}</Typography>
        <Stack alignItems="center" spacing={0.5} direction="row">
          <Typography variant="body2">group_id: </Typography>
          <Chip label={group.id} size="small" sx={{ fontSize: 12 }} />
        </Stack>
      </Stack>
      {hasPermission ? (
        <Button variant="outlined" color="error" onClick={onDelete} startIcon={<DeleteIcon fontSize="small" />}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </Stack>
  );
});
