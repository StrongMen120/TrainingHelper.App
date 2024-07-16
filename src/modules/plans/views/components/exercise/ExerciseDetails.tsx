import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Instance } from 'mobx-state-tree';
import { FC } from 'react';
import { PageContentWrapper } from 'src/common/components/PageContentWrapper';
import { PlansRoot } from 'src/modules/plans/view-model/plans-root';
import { ExerciseImage } from './ExerciseImage';
import { ExerciseDetailsInfo } from './ExerciseDetailsInfo';
import { UsersRoot } from 'src/modules/user/view-model/user-managment-root';

export const ExerciseDetails: FC<{ plansRoot: Instance<typeof PlansRoot>; userRoot: Instance<typeof UsersRoot> }> = observer(({ plansRoot, userRoot }) => {
  return (
    <Stack height="100%">
      <PageContentWrapper>
        <Stack height="100%">
          <ExerciseDetailsInfo
            exercise={plansRoot.exerciseDetails}
            hasPermission={userRoot.checkIsAdmin() || userRoot.checkIsTrainer() || plansRoot.exerciseDetails?.authorId === userRoot.loginUserId}
          />
          <ExerciseImage
            files={plansRoot.exercisesFiles}
            hasPermission={userRoot.checkIsAdmin() || userRoot.checkIsTrainer() || plansRoot.exerciseDetails?.authorId === userRoot.loginUserId}
          />
        </Stack>
      </PageContentWrapper>
    </Stack>
  );
});
