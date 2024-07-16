import { DialogActions, DialogActionsProps } from '@mui/material';
import { FC } from 'react';

const ModalActions: FC<DialogActionsProps> = ({ children, ...props }) => <DialogActions {...props}>{children}</DialogActions>;

export default ModalActions;
