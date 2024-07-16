import { isNil } from 'lodash';
import { action, makeObservable, observable } from 'mobx';

export type CloseType = 'cancel' | 'close' | 'clickAway' | 'submit';

export class ModalViewModelBase<TAdditionalData = undefined, TCloseType = CloseType> {
  constructor() {
    makeObservable(this, {
      isOpen: observable,
      close: action,
      open: action,
    });
  }

  private closeCallback?: (closeType: TCloseType) => void = undefined;
  isOpen: boolean = false;

  open(data?: TAdditionalData): Promise<TCloseType> {
    this.isOpen = true;
    return new Promise((success, _) => {
      this.closeCallback = success;
    });
  }

  close(type: TCloseType) {
    this.isOpen = false;
    const callback = this.closeCallback;
    this.closeCallback = undefined;

    callback && callback(type);
  }
}

export class SubmittableModalViewModelBase<
  TSubmitModel,
  TSubmitResult = void,
  TAdditionalData = object,
  TSubmitCallback extends (model: TSubmitModel) => TSubmitResult = (model: TSubmitModel) => TSubmitResult,
  TCloseType = CloseType
> {
  private submitCallback?: TSubmitCallback = undefined;
  private closeCallback?: (closeType: TCloseType) => void = undefined;
  isOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      close: action,
      open: action,
      submit: action,
    });
  }

  submit(model: TSubmitModel): TSubmitResult {
    if (isNil(this.submitCallback)) throw new Error('Cannot submit closed modal!');
    return this.submitCallback(model);
  }

  open(submitCallback: TSubmitCallback, data?: TAdditionalData): Promise<TCloseType> {
    this.submitCallback = submitCallback;
    this.isOpen = true;
    return new Promise((success, _) => {
      this.closeCallback = success;
    });
  }

  close(type: TCloseType) {
    this.isOpen = false;
    this.submitCallback = undefined;
    const callback = this.closeCallback;
    this.closeCallback = undefined;

    callback && callback(type);
  }
}
