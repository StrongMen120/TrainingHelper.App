import { MatomoContext, useMatomo } from '@datapunt/matomo-tracker-react';
import { TrackEventParams } from '@datapunt/matomo-tracker-react/lib/types';
import { useCallback, useContext } from 'react';
import trackAsyncQueryFn from './trackAsyncQuery';

/** Enriches useMatomo() with extended functionality */
export function useTracking() {
  const baseTracking = useMatomo();
  const instance = useContext(MatomoContext);

  const trackAsyncQuery = useCallback(
    <T>(event: TrackEventParams, fn: () => Promise<T>): Promise<T> => trackAsyncQueryFn(instance?.trackEvent?.bind(instance)!, event, fn),
    [instance]
  );

  return {
    ...baseTracking,
    trackAsyncQuery,
  };
}
