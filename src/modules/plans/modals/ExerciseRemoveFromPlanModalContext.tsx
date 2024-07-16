import { BodyElements } from '@trainerhelper/plans-api';
import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';

export type ExerciseRemoveFromPlanModalContextInput = {};

export default class ExerciseRemoveFromPlanModalContext extends SubmittableModalViewModelBase<ExerciseRemoveFromPlanModalContextInput, Promise<boolean>> {
  data: ExerciseRemoveFromPlanModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: ExerciseRemoveFromPlanModalContextInput) {
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
