import { GridColumns } from '@mui/x-data-grid-pro';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import UserVM from 'src/modules/user/view-model/user';

export const GroupsMembersTableColumns = (context: Instance<typeof UsersRoot>, isAdmin: boolean, userId: number): GridColumns<Instance<typeof UserVM>> => {
  return [
    { field: 'identifier', headerName: 'ID', width: 100 },
    {
      field: 'firstName',
      headerName: 'Name',
      flex: 1,
      valueGetter: (p) => {
        return p.row.firstName + ' ' + p.row.secondName;
      },
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      filterable: false,
      headerName: 'Actions',
      disableColumnMenu: true,
      width: 75,
      align: 'center',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            disabled={!isAdmin || context.currentGroup?.trainer.identifier !== userId}
            onClick={(_) => {
              context.fetchRemoveMembersToGroup({ groupId: context.currentGroup?.id!, userId: params.row.id });
            }}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            icon={<DeleteIcon fontSize="small" />}
            color="primary"
            label="View"
          />,
        ];
      },
    },
  ];
};
