import { FC, useState } from 'react';
import { createUnsafeContext } from 'src/utils/create-protected-use-context';

type TrackerModals = {};

export const [TrackerModalsContextInstance, useTrackerModals] = createUnsafeContext<TrackerModals>('TrackerModals');
export const TrackerModalsProvider: FC = ({ children }) => {
  const [value] = useState<TrackerModals>({});

  return <TrackerModalsContextInstance.Provider value={value}>{children}</TrackerModalsContextInstance.Provider>;
};
