import { Avatar, Box, Button, Collapse, ListItem, Menu, MenuItem, Stack, styled, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { useTracking } from 'src/utils/tracking';

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 200,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  height: 40,
  width: 40,
}));

const ItemContainer = styled(Box)({
  color: 'neutral.600',
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: 2.5,
  textAlign: 'center',
  textTransform: 'uppercase',
});

const UserButton = styled(Button)({
  color: 'neutral.500',
  justifyContent: 'center',
  textAlign: 'left',
  textTransform: 'none',
  width: '100%',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0, 0.06)',
  },
  '& .MuiButton-startIcon': {
    color: 'neutral.600',
  },
  '& .MuiButton-endIcon': {
    color: 'neutral.600',
  },
});

type SidebarAccountItemProps = {
  isSidebarCollapsed: boolean;
};

const SidebarAccountItem: FC<SidebarAccountItemProps> = ({ isSidebarCollapsed, ...other }) => {
  const classes = useStyles();
  const ref = useRef<any>(null);
  let { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { trackEvent } = useTracking();
  const router = useRouter();

  const handleOpen = (): void => {
    trackEvent({ category: 'user-menu', action: 'open' });
    setOpen(true);
  };

  const handleClose = (): void => {
    trackEvent({ category: 'user-menu', action: 'close' });
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    trackEvent({ category: 'user-action', action: 'logout' });

    try {
      handleClose();
      await logout();
      router.push('/');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error',
      });
    }
  };

  if (user === null)
    return (
      <ItemContainer>
        <Typography paddingY={1} variant="h4" color="error">
          User not logged in!
        </Typography>
      </ItemContainer>
    );

  return (
    <ItemContainer>
      <ListItem disableGutters sx={{ px: 0.5, py: isSidebarCollapsed ? 0.5 : 1 }}>
        <UserButton disableRipple onClick={handleOpen} ref={ref}>
          <UserAvatar alt="User" src={user.avatar} />
          <Collapse orientation="horizontal" in={!isSidebarCollapsed} sx={{ width: '100%', '& .MuiCollapse-wrapperInner': { width: '100%' } }}>
            <Stack paddingLeft={1} width="100%">
              <Typography variant="inherit" noWrap textOverflow="ellipsis">
                {user.name}
              </Typography>
              <Typography noWrap color="GrayText" textOverflow="ellipsis" maxWidth={1}>
                {user.roles.join(', ')}
              </Typography>
            </Stack>
          </Collapse>
        </UserButton>

        <Menu
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          keepMounted
          PaperProps={{ className: classes.popover }}
          anchorEl={ref.current}
          open={isOpen}
        >
          {/* <MenuItem component={Link} href="/app/social/profile"> */}
          {/* <MenuItem>Profile</MenuItem> */}
          {/* <MenuItem component={Link} href="/app/account"> */}
          {/* <MenuItem>Account</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </ListItem>
    </ItemContainer>
  );
};

export default SidebarAccountItem;
