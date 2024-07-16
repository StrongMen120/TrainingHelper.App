import { ReactNode } from 'react';
import { Users as GroupIcon, User as UserIcon } from 'react-feather';
import {
  FitnessCenter as FitnessCenterIcon,
  TaskAlt as TaskAltIcon,
  Wysiwyg as WysiwygIcon,
  Dashboard as DashboardIcon,
  EmojiEvents as EmojiEventsIcon,
  SsidChart as SsidChartIcon,
} from '@mui/icons-material';
import { RuntimeConfig } from 'src/RuntimeConfig';
import { Routes } from 'src/routes';

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
  disabled?: boolean;
}

interface Section {
  title: string;
  items: Item[];
  disabled?: boolean;
  getVisibility?: (config: RuntimeConfig, isAdmin: boolean, isTrainer: boolean) => boolean;
}

export const sections: Section[] = [
  {
    title: 'Plans',
    items: [
      {
        title: 'Dashboard',
        path: Routes.dashboard.root,
        icon: <DashboardIcon />,
      },
      {
        title: 'Plans',
        path: Routes.dashboard.plans,
        icon: <WysiwygIcon />,
      },
    ],
  },
  {
    title: 'Exercise',
    items: [
      {
        title: 'Exercise',
        path: Routes.exercise.exercises,
        icon: <FitnessCenterIcon />,
      },
      {
        title: 'Done Exercise',
        path: Routes.exercise.doneExercise,
        icon: <TaskAltIcon />,
      },
      {
        title: 'Records',
        path: Routes.exercise.records,
        icon: <EmojiEventsIcon />,
      },
      {
        title: 'Statistics',
        path: Routes.exercise.statistics,
        icon: <SsidChartIcon />,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        title: 'Profile',
        path: Routes.user.profile,
        icon: <UserIcon />,
      },
    ],
  },
  {
    title: 'Group Management',
    items: [
      {
        title: 'Groups',
        path: Routes.user.groups,
        icon: <GroupIcon />,
      },
    ],
    getVisibility(config, isAdmin, isTrainer) {
      return isAdmin || isTrainer;
    },
  },
  {
    title: 'Admin',
    items: [
      {
        title: 'Users',
        path: Routes.user.users,
        icon: <UserIcon />,
      },
    ],
    getVisibility(config, isAdmin) {
      return isAdmin;
    },
  },
];
