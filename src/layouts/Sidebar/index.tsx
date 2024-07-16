import { Divider, Drawer, Paper, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import SidebarAccountItem from './items/SidebarAccountItem';
import { CollapseButton } from './items/CollapseButton';
import { DarkDivider } from './DarkDivider';
import { SidebarContent } from './SidebarContent';
import { SidebarLogoItem } from './items/SidebarLogoItem';

interface DashboardSidebarProps {
  onClose: () => void;
  open: boolean;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ onClose, open }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }
    if (open) {
      onClose();
    }
  };
  useEffect(handlePathChange, [router.isReady, router.asPath]);

  return (
    <Paper
      sx={{
        borderRadius: 0,
        height: '100%',
        backgroundColor: 'background.paper',
        borderRightColor: 'divider',
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        color: '#FFFFFF',
        width: isCollapsed ? 80 : 220,
        transition: (theme) => theme.transitions.create('width'),
        flexDirection: 'column',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <SidebarLogoItem isSidebarCollapsed={isCollapsed} />
      <Divider />
      <SidebarAccountItem isSidebarCollapsed={isCollapsed} />
      <Divider />
      <SidebarContent isCollapsed={isCollapsed} />
      <Divider />
      <CollapseButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </Paper>
  );
};
