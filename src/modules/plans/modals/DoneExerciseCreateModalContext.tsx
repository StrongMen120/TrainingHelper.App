import { BodyElements } from '@trainerhelper/plans-api';
import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';
import { SeriesInfo } from '../views/components/doneExercise/TreeViewDoneExercise';

export type DoneExerciseCreateModalContextInput = {
  date: Date;
  exerciseId: number;
  series: number;
  rate: number;
  rpe: number;
  brake: number;
  doneSeries: SeriesInfo[];
};

export default class DoneExerciseCreateModalContext extends SubmittableModalViewModelBase<DoneExerciseCreateModalContextInput, Promise<boolean>> {
  data: DoneExerciseCreateModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: DoneExerciseCreateModalContextInput) {
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
