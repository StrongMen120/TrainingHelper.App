import { GridColumns, GridValueFormatterParams } from '@mui/x-data-grid-pro';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Instance } from 'mobx-state-tree';
import React from 'react';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import RecordExerciseVM from 'src/modules/plans/view-model/record-exercise';

export const RecordsExerciseHistoryTableColumns = (context: Instance<typeof PlansRoot>): GridColumns<Instance<typeof RecordExerciseVM>> => {
  return [
    {
      field: 'date',
      headerName: 'Date',
      type: 'datetime',
      width: 100,
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return params.value?.toLocaleDateString();
      },
    },
    { field: 'weight', headerName: 'Weight', width: 100 },
    { field: 'reps', headerName: 'Reps', width: 100 },
    { field: 'adamsResult', headerName: 'Adams', hide: true, flex: 1 },
    { field: 'baechleResult', headerName: 'Baechle', hide: true, flex: 1 },
    { field: 'bergerResult', headerName: 'Berger', hide: true, flex: 1 },
    { field: 'brownResult', headerName: 'Brown', hide: true, flex: 1 },
    { field: 'brzyckiResult', headerName: 'Brzycki', hide: true, flex: 1 },
    { field: 'epleyResult', headerName: 'Epley', hide: true, flex: 1 },
    { field: 'lombardiResult', headerName: 'Lombardi', hide: true, flex: 1 },
    { field: 'mayhewResult', headerName: 'Mayhew', hide: true, flex: 1 },
    { field: 'oneRepetitionMaximum', headerName: 'One Rep', flex: 1 },
    { field: 'isAutomat', headerName: 'Auto', hide: true, flex: 1 },
  ];
};
