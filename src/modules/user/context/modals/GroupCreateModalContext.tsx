import { flow, makeObservable, override } from 'mobx';
import { CloseType, SubmittableModalViewModelBase } from 'src/common/view-models/modals';
import { AsyncReturnType } from 'src/types/promise-types';

export type GroupCreateModalContextInput = {
  name: string;
  trainerId: number;
};

export default class GroupCreateModalContext extends SubmittableModalViewModelBase<GroupCreateModalContextInput, Promise<boolean>> {
  data: GroupCreateModalContextInput | undefined = undefined;
  constructor() {
    super();
    makeObservable(this, {
      close: override,
      submitAndClose: flow.bound,
    });
  }
  *submitAndClose(model: GroupCreateModalContextInput) {
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
