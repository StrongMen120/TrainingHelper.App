import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { PlansImage } from '@trainerhelper/plans-api';
import { Avatar } from '@mui/material';

export const platformPlansIcon: { [key in PlansImage]: string } = {
  Friday: '/static/image/plans/FRI.png',
  Legs: '/static/image/plans/LEGS.png',
  Monday: '/static/image/plans/MON.png',
  Pull: '/static/image/plans/PULL.png',
  Push: '/static/image/plans/PUSH.png',
  Saturday: '/static/image/plans/SAT.png',
  Sunday: '/static/image/plans/SUN.png',
  Thursday: '/static/image/plans/THU.png',
  Tuesday: '/static/image/plans/TUE.png',
  Upper: '/static/image/plans/UPPER.png',
  Lower: '/static/image/plans/LOWER.png',
  Wednesday: '/static/image/plans/WED.png',
};

export const TableImage: FC<{ img: PlansImage }> = observer(({ img }) => {
  return <Avatar alt={img} src={platformPlansIcon[img]} sx={{ width: 40, height: 40, bgcolor: 'white' }} variant="rounded" />;
});
