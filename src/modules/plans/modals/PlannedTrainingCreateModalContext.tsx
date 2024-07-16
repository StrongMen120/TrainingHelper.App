import { PlansType } from '@trainerhelper/plans-api';
import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';

export type PlannedTrainingCreateModalContextInput = {
  dateStart: Date;
  dateEnd: Date;
  plansId: number;
  plansType: PlansType;
  userId: number | null;
  groupId: number | null;
  trainerId: number | null;
};

export default class PlannedTrainingCreateModalContext extends SubmittableModalViewModelBase<PlannedTrainingCreateModalContextInput, Promise<boolean>> {
  data: PlannedTrainingCreateModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: PlannedTrainingCreateModalContextInput) {
    try {
      const submitResult: AsyncReturnType<typeof this.submit> = yield this.submit(model);

      this.data = undefined;
      if (submitResult) {
        this.close('submit');
      }
      return submitResult;
    } catch (e) {}
  }

  override close(type: CloseType): void {
    this.data = undefined;
    super.close(type);
  }
}
