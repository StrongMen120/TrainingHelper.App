import { Instance } from 'mobx-state-tree';
import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import DataGridToolbarCustom from 'src/common/components/DataGridToolbarCustom';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { ExerciseTableColumns } from '../columns/ExerciseTableColumns';
import { usePlansModals } from 'src/modules/plans/modals';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

export const ExerciseTable: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  const { addExerciseModal } = usePlansModals().exerciseModals;
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={plansRoot.exercises}
        columns={ExerciseTableColumns(plansRoot)}
        loading={plansRoot.isLoadingExercise}
        hideFooter={true}
        components={{
          Toolbar: () => (
            <DataGridToolbarCustom>
              <Button
                onClick={() => {
                  addExerciseModal.open(async (result) => {
                    plansRoot.fetchCreateExercise({ name: result.name, description: result.description, authorId: userRoot.loginUserId, bodyElements: result.bodyElements });
                    return true;
                  });
                }}
                endIcon={<AddCircleIcon fontSize="small" />}
                style={{ margin: 4 }}
                variant="outlined"
              >
                Add New Exercise
              </Button>
            </DataGridToolbarCustom>
          ),
        }}
      />
    </Box>
  );
});
