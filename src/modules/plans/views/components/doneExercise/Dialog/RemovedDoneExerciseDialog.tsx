import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Instance } from 'mobx-state-tree';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { usePlansModals } from 'src/modules/plans/modals';

const RemovedDoneExerciseDialog: FC<{ root: Instance<typeof PlansRoot> }> = observer(({ root }) => {
  const { removeDoneExerciseModal } = usePlansModals().doneExerciseModals;

  return (
    <Dialog open={removeDoneExerciseModal.isOpen} fullWidth maxWidth="sm" onClose={() => removeDoneExerciseModal.close('clickAway')}>
      <DialogTitle>Remove Done Exercise</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Are you sure to delete this Done Exercise ?
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="row" width="100%" gap={2} alignItems="center">
          <Button disabled={root.isLoadingDoneExercise} onClick={() => removeDoneExerciseModal.close('cancel')}>
            Cancel
          </Button>
          <Box flexGrow={1} />
          <Button disabled={root.isLoadingDoneExercise} onClick={() => removeDoneExerciseModal.submitAndClose({})}>
            Remove
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
});

export default RemovedDoneExerciseDialog;
