import { GridColumns } from '@mui/x-data-grid-pro';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import GroupVM from 'src/modules/user/view-model/group';

export const GroupsTableColumns = (context: Instance<typeof UsersRoot>, visibleActionsSection: boolean = true): GridColumns<Instance<typeof GroupVM>> => {
  return visibleActionsSection
    ? [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'name',
          headerName: 'Name Group',
          flex: 1,
        },
        {
          field: 'trainer',
          headerName: 'Trainer',
          valueGetter: (p) => {
            return p.row.trainer.firstName + ' ' + p.row.trainer.secondName;
          },
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
          getActions: (params) => [
            <GridActionsCellItem
              onClick={(_) => {
                context.selectedGroupDetails(params.row.id);
              }}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              icon={<VisibilityIcon fontSize="small" />}
              color="primary"
              label="View"
            />,
          ],
        },
      ]
    : [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'name',
          headerName: 'Name Group',
          flex: 1,
        },
        {
          field: 'trainer',
          headerName: 'Trainer',
          valueGetter: (p) => {
            return p.row.trainer.firstName + ' ' + p.row.trainer.secondName;
          },
          flex: 1,
        },
      ];
};
