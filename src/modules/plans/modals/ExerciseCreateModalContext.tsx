import { BodyElements } from '@trainerhelper/plans-api';
import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';

export type ExerciseCreateModalContextInput = {
  name: string;
  description: string;
  bodyElements: BodyElements[];
};

export default class ExerciseCreateModalContext extends SubmittableModalViewModelBase<ExerciseCreateModalContextInput, Promise<boolean>> {
  data: ExerciseCreateModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: ExerciseCreateModalContextInput) {
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
