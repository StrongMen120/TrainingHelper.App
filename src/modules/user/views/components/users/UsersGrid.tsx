import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { UsersTableColumns } from '../columns/UsersTableColumns';
import { observer } from 'mobx-react-lite';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';

export const UsersGrid: FC<{ root: Instance<typeof UsersRoot> }> = observer(({ root }) => {
  return (
    <Box sx={{ height: '100%', width: '100%', margin: '2px' }}>
      <DataGrid
        rows={root.users}
        columns={UsersTableColumns(root)}
        loading={root.isLoadingUsers}
        hideFooter={true}
        components={{
          Toolbar: () => <DataGridToolbarCustom />,
        }}
      />
    </Box>
  );
});
