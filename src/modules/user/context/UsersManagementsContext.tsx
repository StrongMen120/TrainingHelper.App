import { Instance } from 'mobx-state-tree';
import { createUnsafeContext } from 'src/common/utils/create-protected-use-context';
import { UsersRoot } from '../view-model/user-managment-root';

export const [UsersManagementsContext, useUsersManagementsRoot] = createUnsafeContext<Instance<typeof UsersRoot>>('UsersRootContext');
export const UsersManagementsProvider = UsersManagementsContext.Provider;
