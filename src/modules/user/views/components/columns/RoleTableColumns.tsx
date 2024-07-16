import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import RoleVM from 'src/modules/user/view-model/role';
import DeleteIcon from '@mui/icons-material/Delete';

export const RoleTableColumns = (context: Instance<typeof UsersRoot>): GridColumns<Instance<typeof RoleVM>> => {
  return [
    { field: 'identifier', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
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
            context.deletePermission(context.selectedUserId, params.row.identifier);
          }}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          icon={<DeleteIcon fontSize="small" />}
          color="error"
          label="View"
        />,
      ],
    },
  ];
};
