import { isNil } from 'lodash';
import { destroy, IAnyStateTreeNode, IAnyType, Instance, IType, ModelActions } from 'mobx-state-tree';

export type MstExtendFunction<TInstance extends Instance<IAnyType>, A extends ModelActions = {}, V extends Object = {}, VS extends Object = {}> = (self: TInstance) => {
  actions?: A;
  views?: V;
  state?: VS;
};

export function withBoundViews<TField extends keyof TInstance, TInstance extends Instance<IType<{ [key in TField]: object }, any, any>>, TViewKey extends keyof TInstance[TField]>(
  field: TField,
  views: TViewKey[]
): MstExtendFunction<TInstance, {}, { [key in TViewKey]: TInstance[TField][key] }> {
  return (self: TInstance) => {
    const result: any = {};

    for (let view of views) {
      Object.defineProperty(result, view, {
        configurable: true,
        enumerable: true,
        get: () => self[field][view],
      });
    }

    return { views: result };
  };
}

export function ensureNodeType<T extends IAnyType>(type: T, value: any): Instance<T> | null {
  return type.is(value) ? value : null;
}

export function extend<T extends IAnyType, E extends object = {}>(type: T, extension: E): T & E {
  return Object.assign(type, extension);
}

export function safeDestroy<T extends IAnyStateTreeNode>(instance: T | undefined) {
  if (isNil(instance)) return;

  try {
    destroy(instance);
  } catch (e) {}
}
