import { flow, getEnv, Instance } from 'mobx-state-tree';
import { AsyncReturnType } from 'src/types/promise-types';
import UserCache from './user-cache';

export function createUserRepositoryActions(context: Instance<typeof UserCache>) {
  return {
    
  };
}

export type UserRepository = ReturnType<typeof createUserRepositoryActions>;
