import { BodyElements } from '@trainerhelper/plans-api';
import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';
import { SeriesInfo } from '../views/components/doneExercise/TreeViewDoneExercise';

export type ExerciseCreatePlanToModalContextInput = {
  identifier: string;
  exerciseId: number;
  series: number;
  rate: number;
  rpe: number;
  brake: number;
  seriesInfo: SeriesInfo[];
};

export default class ExerciseCreatePlanToModalContext extends SubmittableModalViewModelBase<ExerciseCreatePlanToModalContextInput, Promise<boolean>> {
  data: ExerciseCreatePlanToModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: ExerciseCreatePlanToModalContextInput) {
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
