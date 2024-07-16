import { Divider, Stack } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import PlanVM from 'src/modules/plans/view-model/plans';
import { Instance } from 'mobx-state-tree';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { PlansStartHeader } from './PlansStartHeader';
import { ViewWrapper } from 'src/common/components/ViewWrapper';
import { PlansStartView } from './PlansStartView';
import { useUsersManagementsRoot } from 'src/modules/user/context/UsersManagementsContext';
import { OneCreatedDoneExerciseCommand } from '@trainerhelper/plans-api';
import { Routes } from 'src/routes';
import { useRouter } from 'next/router';

export const PlansStart: React.FC<{ planDetails: Instance<typeof PlanVM>; plansRoot: Instance<typeof PlansRoot> }> = observer(({ planDetails, plansRoot }) => {
  const plannedExercise = plansRoot.getAllExercisesToPlanById(planDetails.id);
  const router = useRouter();
  const userRoot = useUsersManagementsRoot();
  return (
    <Stack height="100%">
      <PlansStartHeader
        name={`Plan: ${planDetails.name}`}
        onSaveClick={() => {
          const rows: OneCreatedDoneExerciseCommand[] = [];
          plannedExercise.forEach((element) => {
            rows.push({
              brakeSeconds: element.BrakeSeconds,
              exerciseInfoId: element.ExerciseId,
              rate: element.Rate,
              reps: element.SeriesInfo.map((e) => e.Reps),
              rpe: element.RPE,
              series: element.Series,
              weight: element.SeriesInfo.map((e) => e.Weight),
            });
          });
          plansRoot.fetchCreateDoneExercise({ date: new Date(), userId: userRoot.loginUserId, doneExercise: rows });
          router.push(Routes.dashboard.plans);
        }}
      />
      <Divider />
      <ViewWrapper>
        <PlansStartView plannedExercise={plannedExercise} plansRoot={plansRoot} />
      </ViewWrapper>
    </Stack>
  );
});
