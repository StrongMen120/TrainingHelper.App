import { FC, useState } from 'react';
import { createUnsafeContext } from 'src/utils/create-protected-use-context';
import ExerciseCreateModalContext from './ExerciseCreateModalContext';
import DoneExerciseCreateModalContext from './DoneExerciseCreateModalContext';
import ExerciseRemoveModalContext from './ExerciseRemoveModalContext';
import DoneExerciseRemoveModalContext from './DoneExerciseRemoveModalContext';
import PlannedTrainingCreateModalContext from './PlannedTrainingCreateModalContext';
import ExerciseRemoveFromPlanModalContext from './ExerciseRemoveFromPlanModalContext';
import ExerciseCreatePlanToModalContext from './ExerciseCreatePlanToModalContext';
import PlanRemoveModalContext from './PlanRemoveModalContext';
import RecordsCreateModalContext from './RecordsCreateModalContext';

type PlansModals = {
  planedTraining: {
    addPlannedTraining: PlannedTrainingCreateModalContext;
  };
  recordsModals: {
    addRecords: RecordsCreateModalContext;
  };
  exerciseModals: {
    removeExerciseModal: ExerciseRemoveModalContext;
    addExerciseModal: ExerciseCreateModalContext;
  };
  doneExerciseModals: {
    removeDoneExerciseModal: DoneExerciseRemoveModalContext;
    addDoneExerciseModal: DoneExerciseCreateModalContext;
  };
  plansModals: {
    removedPlan: PlanRemoveModalContext;
    removedExerciseFromPlan: ExerciseRemoveFromPlanModalContext;
    addExerciseToPlan: ExerciseCreatePlanToModalContext;
  };
};

export const [PlansModalsContextInstance, usePlansModals] = createUnsafeContext<PlansModals>('PlansModals');
export const PlansModalsProvider: FC = ({ children }) => {
  const [value] = useState<PlansModals>({
    planedTraining: { addPlannedTraining: new PlannedTrainingCreateModalContext() },
    recordsModals: { addRecords: new RecordsCreateModalContext() },
    exerciseModals: { addExerciseModal: new ExerciseCreateModalContext(), removeExerciseModal: new ExerciseRemoveModalContext() },
    doneExerciseModals: { addDoneExerciseModal: new DoneExerciseCreateModalContext(), removeDoneExerciseModal: new DoneExerciseRemoveModalContext() },
    plansModals: {
      removedPlan: new PlanRemoveModalContext(),
      addExerciseToPlan: new ExerciseCreatePlanToModalContext(),
      removedExerciseFromPlan: new ExerciseRemoveFromPlanModalContext(),
    },
  });

  return <PlansModalsContextInstance.Provider value={value}>{children}</PlansModalsContextInstance.Provider>;
};
