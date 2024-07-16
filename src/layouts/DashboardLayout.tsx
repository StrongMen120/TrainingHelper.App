import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import { useState } from 'react';
import { DashboardSidebar } from './Sidebar';

type Props = {
  children?: React.ReactNode;
};

const DashboardLayoutRoot = styled(Stack)((theme) => ({
  height: '100%',
  width: '100%',
  flex: 1,
  overflow: 'hidden',
}));

export const DashboardLayout: FC<Props> = observer(({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <Stack direction="row" height="100vh" width="100vw" overflow={'hidden'}>
      <DashboardSidebar onClose={() => setIsSidebarOpen(false)} open={isSidebarOpen} />
      <Stack flex={1} overflow="hidden">
        <DashboardLayoutRoot>{children}</DashboardLayoutRoot>
      </Stack>
    </Stack>
  );
});
