import { Instance } from 'mobx-state-tree';
import { createUnsafeContext } from 'src/common/utils/create-protected-use-context';
import { PlansRoot } from '../view-model/plans-root';

export const [PlansContext, usePlansRoot] = createUnsafeContext<Instance<typeof PlansRoot>>('PlansRootContext');
export const PlansProvider = PlansContext.Provider;
