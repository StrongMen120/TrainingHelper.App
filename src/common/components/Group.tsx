import { Stack, StackProps } from '@mui/material';

export const Group: React.FC<Omit<StackProps, 'direction'>> = (props) => <Stack {...props} direction="row" />;
