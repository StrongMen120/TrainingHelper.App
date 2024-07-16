import type { FC } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from 'src/icons/Menu';

type DashboardNavbarProps = {
  onOpenSidebar?: () => void;
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

export const DashboardNavbar: FC<DashboardNavbarProps> = ({ onOpenSidebar }) => {
  return (
    <>
      <DashboardNavbarRoot position="relative">
        <Toolbar
          sx={{
            width: '100%',
            minHeight: 64,
            px: 2,
          }}
        >
          <IconButton onClick={onOpenSidebar} sx={{ display: { lg: 'none' } }}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
