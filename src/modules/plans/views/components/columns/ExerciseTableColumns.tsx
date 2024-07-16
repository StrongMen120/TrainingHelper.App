import { GridColumns } from '@mui/x-data-grid-pro';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import ExerciseVM from 'src/modules/plans/view-model/exercise';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';

export const ExerciseTableColumns = (context: Instance<typeof PlansRoot>): GridColumns<Instance<typeof ExerciseVM>> => {
  return [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
        },
        {
          field: 'bodyElements',
          headerName: 'Body',
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
                context.fetchExerciseDetails(params.row.id);
                context.selectedExerciseDetails(params.row.id);
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
};
