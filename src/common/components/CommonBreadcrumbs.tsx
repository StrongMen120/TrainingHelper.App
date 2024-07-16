import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

const CommonBreadcrumbsLink: React.FC<CommonBreadcrumbsItem> = ({ name, href }) => (
  <Link variant="body1" color="inherit" component={NextLink} href={href} passHref>
    {name}
  </Link>
);

const CommonBreadcrumbsCurrPage: React.FC<CommonBreadcrumbsItem> = ({ name }) => <Typography color="text.primary">{name}</Typography>;

export const CommonBreadcrumbs: React.FC<CommonBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((breadcrumbItem, index) =>
        breadcrumbItem.href !== undefined ? (
          <CommonBreadcrumbsLink {...breadcrumbItem} key={breadcrumbItem.name + index} />
        ) : (
          <CommonBreadcrumbsCurrPage {...breadcrumbItem} key={breadcrumbItem.name + index} />
        )
      )}
    </Breadcrumbs>
  );
};

export interface CommonBreadcrumbsProps {
  items: CommonBreadcrumbsItem[];
}

export type CommonBreadcrumbsItem = {
  name: string;
  href?: string;
};
