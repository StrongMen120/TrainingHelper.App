import { PlannedTrainingsDto, PlansType } from '@trainerhelper/plans-api';
import { merge } from 'lodash';
import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { createMapUpdate } from 'src/common/utils/mst-utils';
import PlannedTrainingVM from './planned-training';
import { safeDestroy } from 'src/common/utils/mst-helpers';
import { CalendarEvent } from 'src/types/calendar';
import UserVM from 'src/modules/user/view-model/user';

function colorEvent(typePlan:PlansType): string {
  if(typePlan == PlansType.Individual) return '#FFB020'
  if(typePlan == PlansType.Group) return '#14B8A6'
  return '#D14343'
  
}
function createPlannedTrainingVM(dto: PlannedTrainingsDto): SnapshotIn<typeof PlannedTrainingVM> {
  return { id: dto.identifier, dto };
}
const PlannedTrainingCache = types
  .model({
    PlannedTrainingsCache: types.map(PlannedTrainingVM),
  })
  .volatile((self) => ({
    isLoadingPlannedTrainings: true,
    selectedPlannedTrainings: '',
  }))
  .views((self) => ({
    get plannedTrainings() {
      return [...self.PlannedTrainingsCache.values()];
    },
    get selectedPlannedTraining() {
      return this.getPlannedTrainingById(self.selectedPlannedTrainings);
    },
    getPlannedTrainingById(id: string | number) {
      return self.PlannedTrainingsCache.get(id.toString());
    },
    getEventsToCalendar(user: Instance<typeof UserVM>): CalendarEvent[] {
      var planned = this.plannedTrainings.filter((e)=> e.userId === user.id || e.trainerId === user.id || user.groupsId.includes(e.groupId ? e.groupId : 0));
      var events: CalendarEvent[] =[];
      planned.map((e)=>{
        events.push( {
          id: e.id,
          color: colorEvent(e.plansType),
          end: new Date(e.dateEnd).getTime(),
          planId: e.plansId,
          start: new Date(e.dateStart).getTime(),
          title: e.plansType.toString(),
        });
      })
      return events;
  },
  }))
  .actions((self) => ({
    updatePlannedTrainings(dtos: PlannedTrainingsDto[], options: { enableQueueing: boolean; batchSize?: number; delay?: number } = { enableQueueing: false }) {
      const { enableQueueing, batchSize, delay } = merge({ batchSize: 1000, delay: 250 }, options);
      if (enableQueueing && dtos.length > batchSize) {
        const nextBatch = dtos.splice(batchSize);
        setTimeout(() => this.updatePlannedTrainings(nextBatch, options), delay);
      }
      const update = createMapUpdate(dtos, createPlannedTrainingVM, (d, m) => m.id);
      self.PlannedTrainingsCache.merge(update);
      self.isLoadingPlannedTrainings = false;
    },
    deletePlannedTraining(identifier: string ) {
      const model = self.PlannedTrainingsCache.get(identifier.toString());
      self.PlannedTrainingsCache.delete(identifier.toString());
      safeDestroy(model);
      self.isLoadingPlannedTrainings = false;
    },
    setSelectedPlannedTrainings(identifier: string) {
      self.selectedPlannedTrainings = identifier;
    },
    setLoadingPlannedTrainings(value: boolean) {
      self.isLoadingPlannedTrainings = value;
    }
  }));

export default PlannedTrainingCache;
