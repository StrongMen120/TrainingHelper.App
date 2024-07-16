import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { RecordsExerciseTableColumns } from '../columns/RecordsExerciseTableColumns';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { Box, Button } from '@mui/material';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';
import { usePlansModals } from 'src/modules/plans/modals';

export const AllRecords: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  const { addRecords } = usePlansModals().recordsModals;
  return (
    <Box sx={{ height: '50%', width: '100%', margin: '2px' }}>
      <DataGrid
        rows={plansRoot.recordExercise}
        columns={RecordsExerciseTableColumns(plansRoot, userRoot)}
        loading={plansRoot.isLoadingRecordExercise}
        hideFooter={true}
        components={{
          Toolbar: () => (
            <DataGridToolbarCustom>
              <Button
                onClick={() => {
                  addRecords.open(async (result) => {
                    plansRoot.fetchCreateRecordsExercise({ exerciseId: result.exerciseId, userId: userRoot.loginUserId, reps: result.reps, weight: result.weight });
                    return true;
                  });
                }}
                endIcon={<AddCircleIcon fontSize="small" />}
                style={{ margin: 4 }}
                variant="outlined"
              >
                Add New Record
              </Button>
            </DataGridToolbarCustom>
          ),
        }}
      />
    </Box>
  );
});
