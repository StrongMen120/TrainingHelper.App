import type { ListProps } from '@mui/material';
import { List, ListSubheader } from '@mui/material';
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
import { DashboardSidebarItem } from './DashboardSidebarItem';

interface Item {
  path?: string;
  icon?: ReactNode;
  chip?: ReactNode;
  info?: ReactNode;
  children?: Item[];
  title: string;
  disabled?: boolean;
}

interface DashboardSidebarSectionProps extends ListProps {
  items: Item[];
  path: string;
  title: string;
  collapsed: boolean;
  disabled?: boolean;
}

const renderNavItems = ({ depth = 0, items, path, collapsed }: { depth?: number; items: Item[]; path: string; collapsed: boolean }): JSX.Element => (
  <List disablePadding>
    {items.reduce(
      (acc: JSX.Element[], item) =>
        reduceChildRoutes({
          acc,
          item,
          depth,
          path,
          collapsed,
        }),
      []
    )}
  </List>
);

const reduceChildRoutes = ({ acc, item, depth, path, collapsed }: { acc: JSX.Element[]; depth: number; item: Item; path: string; collapsed: boolean }): Array<JSX.Element> => {
  const key = `${item.title}-${depth}`;
  const partialMatch = path.includes(item.path ?? '');
  const exactMatch = path === item.path;
  
  if (item.children) {
    acc.push(
      <DashboardSidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
        collapsed={collapsed}
        disabled={item.disabled}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path,
          collapsed,
        })}
      </DashboardSidebarItem>
    );
  } else {
    acc.push(
      <DashboardSidebarItem
        collapsed={collapsed}
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
        disabled={item.disabled}
      />
    );
  }

  return acc;
};

export const DashboardSidebarSection: FC<DashboardSidebarSectionProps> = (props) => {
  const { items, path, title, collapsed, disabled, ...other } = props;

  return (
    <List
      subheader={
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: 'neutral.600',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 2.5,
            ml: collapsed ? 1 : 0,
            textAlign: !collapsed ? 'center' : 'left',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </ListSubheader>
      }
      {...other}
    >
      {renderNavItems({
        items,
        path,
        collapsed,
      })}
    </List>
  );
};

DashboardSidebarSection.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
