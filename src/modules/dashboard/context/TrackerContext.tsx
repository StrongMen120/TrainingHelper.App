import { Instance } from 'mobx-state-tree';
import { createUnsafeContext } from 'src/common/utils/create-protected-use-context';
import { TrackerRoot } from '../view-model/tracker-root';

export const [TrackerContext, useTrackerRoot] = createUnsafeContext<Instance<typeof TrackerRoot>>('TrackerRootContext');
export const TrackerProvider = TrackerContext.Provider;
