import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import type { FC } from 'react';
import React from 'react';

const Header: FC<HeaderProps> = ({ title, actions, breadcrumbs }) => {
  return (
    <Stack direction="row" paddingX={2} paddingY={1} alignItems="center" justifyContent="space-between">
      <Stack direction="column">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs.map((value) => {
            if (value.href === undefined) {
              return (
                <Typography variant="body1" color="textPrimary" key={value.text}>
                  {value.text}
                </Typography>
              );
            } else {
              return (
                <NextLink href={value.href} key={value.text} passHref>
                  <Link variant="body1" color="inherit">
                    {value.text}
                  </Link>
                </NextLink>
              );
            }
          })}
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {title}
        </Typography>
      </Stack>
      {actions}
    </Stack>
  );
};

export default Header;

export interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
  breadcrumbs: BreadcrumbChild[];
}

export interface BreadcrumbChild {
  text: string;
  href?: string;
}
