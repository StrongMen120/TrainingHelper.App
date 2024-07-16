import { Button, Collapse, styled, Theme, Typography } from '@mui/material';
import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft as ChevronLeftIcon } from '../../../icons/chevron-left';

type CollapseButtonProps = {
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean;
};

const DrawerIcon = styled(ChevronLeftIcon)(({ theme }) => ({
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const CollapseButton: React.FC<CollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <Button fullWidth onClick={() => setIsCollapsed(!isCollapsed)} color="primary">
      <Box flexGrow={1} />
      <Collapse orientation="horizontal" in={!isCollapsed}>
        <Typography variant="button">Collapse</Typography>
      </Collapse>
      <Box flexGrow={1} />
      <DrawerIcon sx={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0)' }} />
    </Button>
  );
};
