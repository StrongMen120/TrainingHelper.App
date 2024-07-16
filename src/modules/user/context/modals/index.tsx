import { FC, useState } from 'react';
import { createUnsafeContext } from 'src/utils/create-protected-use-context';
import GroupAddMembersModalContext from './GroupAddMembersModalContext';
import GroupCreateModalContext from './GroupCreateModalContext';

type UserManagementsModals = {
  groupModals: {
    addGroupModal: GroupCreateModalContext;
    addMembersToGroupModal: GroupAddMembersModalContext;
  };
};

export const [UserManagementsModalsContextInstance, useUserManagementsModals] = createUnsafeContext<UserManagementsModals>('UserManagementsModals');
export const UserManagementsModalsProvider: FC = ({ children }) => {
  const [value] = useState<UserManagementsModals>({
    groupModals: {
      addGroupModal: new GroupCreateModalContext(),
      addMembersToGroupModal: new GroupAddMembersModalContext(),
    },
  });

  return <UserManagementsModalsContextInstance.Provider value={value}>{children}</UserManagementsModalsContextInstance.Provider>;
};
