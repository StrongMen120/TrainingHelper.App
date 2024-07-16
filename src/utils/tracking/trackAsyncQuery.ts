import { TrackEventParams, MatomoInstance } from "@datapunt/matomo-tracker-react/lib/types";
import { uniqueId } from "lodash";
import { v4 as uuid } from "uuid"
import { dimensions } from "./tracking";

export default function trackAsyncQueryFn<TOut>(trackEvent: MatomoInstance['trackEvent'], event: TrackEventParams, fn: () => Promise<TOut>): Promise<TOut> {
    let start = Date.now();
    let correlationId = uuid();
  
    return Promise.resolve()
      .then(() => {
        trackEvent && trackEvent({
          ...event,
          customDimensions: [
            { id: dimensions.action.type, value: 'start' },
            { id: dimensions.action.correlationId, value: correlationId },
          ],
        });
        return fn().then((result) => {
          trackEvent && trackEvent({
            ...event,
            value: (Date.now() - start),
            customDimensions: [
              { id: dimensions.action.type, value: 'finish' },
              { id: dimensions.action.state, value: 'success' },
              { id: dimensions.action.duration, value: `${Date.now() - start}` },
            { id: dimensions.action.correlationId, value: correlationId },
            ],
          });
          return result;
        });
      })
      .catch((error) => {
        trackEvent && trackEvent({
          ...event,
          value: (Date.now() - start),
          customDimensions: [
            { id: dimensions.action.type, value: 'finish' },
            { id: dimensions.action.state, value: 'error' },
            { id: dimensions.action.duration, value: `${Date.now() - start}` },
            { id: dimensions.action.correlationId, value: correlationId },
          ],
        });
        throw error;
      });
  }