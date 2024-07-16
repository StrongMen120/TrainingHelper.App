import React, { useState } from 'react';
import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Collapse, ListItem, Typography } from '@mui/material';
import type { ListItemProps } from '@mui/material';
// import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
// import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';

interface DashboardSidebarItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  chip?: ReactNode;
  depth: number;
  icon?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
  collapsed: boolean;
  disabled?: boolean;
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = (props) => {
  const { active, children, chip, depth, icon, info, open: openProp, path, title, collapsed, disabled, ...other } = props;
  const [open, setOpen] = useState<boolean | undefined>(openProp);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 24;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          mb: 0.5,
          py: 0,
          px: 0.5,
        }}
        {...other}
      >
        <Button
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          disabled={disabled}
          sx={{
            color: active ? 'primary.main' : 'neutral.500',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0, 0.06)',
            },
            '& .MuiButton-startIcon': {
              color: active ? 'primary.main' : 'neutral.600',
            },
            '& .MuiButton-endIcon': {
              color: 'neutral.600',
            },
          }}
        >
          <Collapse orientation="horizontal" in={collapsed}>
            <Typography variant="button" fontWeight="inherit" noWrap sx={{ textTransform: 'none' }}>
              <Box flexGrow={1}>{title}</Box>
              {info}
            </Typography>
          </Collapse>
          <Box flexGrow={1} />
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 0.5,
      }}
    >
      <NextLink href={path ?? '/'} passHref>
        <Button
          component="a"
          startIcon={icon}
          endIcon={chip}
          disableRipple
          disabled={disabled}
          className="eloo"
          sx={{
            backgroundColor: active ? 'rgba(0, 0, 0, 0.06)' : 'paper',
            borderRadius: 0.8,
            color: active ? 'primary.main' : 'neutral.500',
            fontWeight: active ? 'fontWeightBold' : '',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'primary.main' : 'neutral.600',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          <Collapse orientation="horizontal" in={collapsed}>
            <Typography variant="button" fontWeight="inherit" noWrap sx={{ textTransform: 'none' }}>
              <Box flexGrow={1} justifyContent="center">
                {title}
              </Box>
              {info}
            </Typography>
          </Collapse>
        </Button>
      </NextLink>
    </ListItem>
  );
};
