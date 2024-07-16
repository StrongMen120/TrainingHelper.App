import React, { useCallback, useState, useRef, useEffect, useMemo, createContext } from 'react';
import fscreen from 'fscreen';
import { createUnsafeContext } from 'src/utils/create-protected-use-context';

export interface FullScreenHandle {
  active: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
  node: React.MutableRefObject<HTMLDivElement | null>;
}

export interface FullScreenProps {
  handle: FullScreenHandle;
  onChange?: (state: boolean, handle: FullScreenHandle) => void;
  className?: string;
}

export function useFullScreenHandle(): FullScreenHandle {
  const [active, setActive] = useState<boolean>(false);
  const node = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleChange = () => {
      setActive(fscreen.fullscreenElement === node.current);
    };
    fscreen.addEventListener('fullscreenchange', handleChange);
    return () => fscreen.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const enter = useCallback(async () => {
    if (fscreen.fullscreenElement) {
      fscreen.exitFullscreen();
      return fscreen.requestFullscreen(fscreen.fullscreenElement);
    } else if (node.current) {
      return fscreen.requestFullscreen(node.current);
    }
  }, []);

  const exit = useCallback(async () => {
    if (fscreen.fullscreenElement === node.current) {
      return fscreen.exitFullscreen();
    }
  }, []);

  const toggle = useCallback(async () => {
    await (active ? exit : enter)();
  }, [active]);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
      node,
      toggle,
    }),
    [active, enter, exit]
  );
}

export const [FullScreenContext, useFullScreen] = createUnsafeContext<FullScreenHandle>('FullScreenContext');

export const FullScreen: React.FC<FullScreenProps> = ({ handle, onChange, children, className }) => {
  //className = (className ?? '') + ' fullscreen' + handle.active ? ' fullscreen-enabled' : '';

  useEffect(() => {
    if (onChange) {
      onChange(handle.active, handle);
    }
  }, [handle.active]);

  return (
    <FullScreenContext.Provider value={handle}>
      <div className={className} ref={handle.node} style={handle.active ? { height: '100%', width: '100%' } : undefined}>
        {children}
      </div>
    </FullScreenContext.Provider>
  );
};
