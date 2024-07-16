import 'simplebar/dist/simplebar.min.css';
import { forwardRef, Ref } from 'react';
import type { MutableRefObject } from 'react';
import SimpleBar from 'simplebar-react';
import type { Theme } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';

interface ScrollbarProps extends SimpleBar.Props {
  // ref: MutableRefObject<SimpleBar>;
  sx?: SxProps<Theme>;
}

const ScrollbarRoot = styled(SimpleBar)``;

// eslint-disable-next-line react/display-name
export const Scrollbar = forwardRef<SimpleBar, ScrollbarProps>((props, ref) => {
  return <ScrollbarRoot ref={ref} {...props} />;
});
