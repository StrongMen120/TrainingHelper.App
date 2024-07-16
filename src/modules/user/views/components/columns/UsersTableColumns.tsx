import { GridColumns } from '@mui/x-data-grid-pro';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import Link from 'next/link';
import React from 'react';
import UserVM from 'src/modules/user/view-model/user';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { rootCertificates } from 'tls';

export const UsersTableColumns = (context: Instance<typeof UsersRoot>): GridColumns<Instance<typeof UserVM>> => {
  return [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 0.6,
    },
    {
      field: 'secondName',
      headerName: 'Last name',
      flex: 0.6,
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
      getActions: (params) => [
        <GridActionsCellItem
          onClick={(_) => {
            context.selectedUserDetails(params.row.id);
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
  ];
};
