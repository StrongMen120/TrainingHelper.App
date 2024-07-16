import { Box } from '@mui/material';
import NextLink from 'next/link';
import { FC } from 'react';
import Logo from 'src/components/Logo';
import LogoSmall from 'src/components/LogoSmall';

type SidebarLogoItemProps = {
  isSidebarCollapsed: boolean;
};

export const SidebarLogoItem: FC<SidebarLogoItemProps> = ({ isSidebarCollapsed }) => {
  return (
    <Box padding={isSidebarCollapsed ? 0.5 : 1} textAlign="center">
      <NextLink href="/" passHref>
        <Box
          component="span"
          sx={{
            width: '100%',
            height: 'auto',
          }}
        >
          {isSidebarCollapsed ? <LogoSmall height="auto" /> : <Logo height="auto" />}
        </Box>
      </NextLink>
    </Box>
  );
};
