import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Instance } from 'mobx-state-tree';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { usePlansModals } from 'src/modules/plans/modals';

const RemovedExerciseFromPlanDialog: FC<{ plansRoot: Instance<typeof PlansRoot> }> = observer(({ plansRoot }) => {
  const { removedExerciseFromPlan } = usePlansModals().plansModals;

  return (
    <Dialog open={removedExerciseFromPlan.isOpen} fullWidth maxWidth="sm" onClose={() => removedExerciseFromPlan.close('clickAway')}>
      <DialogTitle>Remove Exercise</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Are you sure to delete this Exercise from Plan ?
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box display="flex" flexDirection="row" width="100%" gap={2} alignItems="center">
          <Button disabled={plansRoot.isLoadingPlans} onClick={() => removedExerciseFromPlan.close('cancel')}>
            Cancel
          </Button>
          <Box flexGrow={1} />
          <Button disabled={plansRoot.isLoadingPlans} onClick={() => removedExerciseFromPlan.submitAndClose({})}>
            Remove
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
});

export default RemovedExerciseFromPlanDialog;
