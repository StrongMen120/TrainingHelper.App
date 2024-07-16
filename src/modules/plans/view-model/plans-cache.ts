import { PlansDto } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import PlanVM from './plans';
import { safeDestroy } from 'src/common/utils/mst-helpers';
import { PlannedExercisesView } from '../views/components/plansDetails/PlansDetailsExercise';
import { SeriesInfo } from '../views/components/doneExercise/TreeViewDoneExercise';

function createPlanVM(dto: PlansDto): SnapshotIn<typeof PlanVM> {
  return { id: dto.identifier, dto };
}
const PlansCache = types
  .model({
    PlansCache: types.map(PlanVM),
  })
  .volatile((self) => ({
    isLoadingPlans: true,
    selectedPlanExercise:'',
  }))
  .views((self) => ({
    get plans() {
      return [...self.PlansCache.values()];
    },
    getPlansById(id: string | number) {
      return self.PlansCache.get(id.toString());
    },
    getExerciseToPlanById(idPlan: string | number, exerciseId: string): PlannedExercisesView | undefined {
      const plannedExercise = self.PlansCache.get(idPlan.toString())?.plannedExercise.find((item) => item.identifier === exerciseId);
      if(plannedExercise) {
      const SeriesRows: SeriesInfo[] = [] 
      for (let i = 0; i < plannedExercise.series; i++) {
       SeriesRows.push({Id:i+1,Weight: plannedExercise.weight[i],Reps:plannedExercise.reps[i]});
   }
      const result: PlannedExercisesView = {Identifier:plannedExercise.identifier,BrakeSeconds:plannedExercise.brakeSeconds,ExerciseId:plannedExercise.exerciseInfoId,Rate:plannedExercise.rate,RPE:plannedExercise.rpe,Series:plannedExercise.series,SeriesInfo:SeriesRows};
      return result;
    }
    },
    getAllExercisesToPlanById(idPlan: string | number): PlannedExercisesView[] {
      const row = this.getPlansById(idPlan)?.plannedExercise;
      const result: PlannedExercisesView[] = [];
      if(row){
        row.forEach((exercise)=>{
          const SeriesRows: SeriesInfo[] = [] 
                 for (let i = 0; i < exercise.series; i++) {
                  SeriesRows.push({Id:i+1,Weight: exercise.weight[i],Reps:exercise.reps[i]});
              }
          result.push({Identifier:exercise.identifier,BrakeSeconds:exercise.brakeSeconds,ExerciseId:exercise.exerciseInfoId,Rate:exercise.rate,RPE:exercise.rpe,Series:exercise.series,SeriesInfo:SeriesRows})}
          )
        
      }
      return result;
    },
  }))
  .actions((self) => ({
    updatePlans(dtos: PlansDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updatePlans(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createPlanVM, (d, m) => m.id);
      self.PlansCache.merge(update);
      self.isLoadingPlans = false;
    },
    deletePlan(identifier: string | number) {
      const model = self.PlansCache.get(identifier.toString());
      self.PlansCache.delete(identifier.toString());
      safeDestroy(model);
      self.isLoadingPlans = false;
    },
    setSelectedPlanExercise(id: string) {
      self.selectedPlanExercise = id;
    },
  }));

export default PlansCache;
