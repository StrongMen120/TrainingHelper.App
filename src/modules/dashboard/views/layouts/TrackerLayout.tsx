import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { RuntimeConfig } from 'src/RuntimeConfig';
import { useRuntimeConfig } from 'src/hooks/useRuntimeConfig';
import { TrackerEnvironment } from '../../abstraction/TrackerEnvironment';
import { TrackerProvider } from '../../context/TrackerContext';
import { TrackerRoot } from '../../view-model/tracker-root';
import { TrackerModalsProvider } from '../../modals';
import { LayoutRenderer } from 'src/common/utils/nested-components';
import { FullScreen, useFullScreenHandle } from 'src/common/hooks/full-screen';
import { AuthGuard } from 'src/common/guard/AuthGuard';

function createEnv(runtimeConfig: RuntimeConfig): TrackerEnvironment {
  return {
    apis: {},
  };
}

export const TrackerLayout = observer(({ children }) => {
  const runtimeConfig = useRuntimeConfig();
  const fullscreenHandle = useFullScreenHandle();
  const env = createEnv(runtimeConfig);
  const root = useMemo(() => TrackerRoot.create({}, env), []);

  return (
    <AuthGuard>
      <FullScreen handle={fullscreenHandle}>
        <TrackerModalsProvider>
          <TrackerProvider value={root}>{children}</TrackerProvider>
        </TrackerModalsProvider>
      </FullScreen>
    </AuthGuard>
  );
});
export const TrackerLayoutRenderer: LayoutRenderer = (page) => <TrackerLayout>{page}</TrackerLayout>;
