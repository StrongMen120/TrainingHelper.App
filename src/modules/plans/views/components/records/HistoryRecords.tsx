import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { Box } from '@mui/material';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { RecordsExerciseHistoryTableColumns } from '../columns/RecordsExerciseHistoryTableColumns';

export const HistoryRecords: FC<{ root: Instance<typeof PlansRoot> }> = observer(({ root }) => {
  if (root.recordExerciseHistory.length === 0) return <></>;
  return (
    <Box sx={{ height: '50%', width: '100%', margin: '2px' }}>
      <DataGrid
        rows={root.recordExerciseHistory}
        columns={RecordsExerciseHistoryTableColumns(root)}
        loading={root.isLoadingRecordExerciseHistory}
        initialState={{
          sorting: {
            sortModel: [{ field: 'oneRepetitionMaximum', sort: 'desc' }],
          },
        }}
        hideFooter={true}
        components={{
          Toolbar: () => <DataGridToolbarCustom />,
        }}
      />
    </Box>
  );
});
