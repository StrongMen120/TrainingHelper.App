import { DialogContent, DialogContentProps } from '@mui/material';
import { FC } from 'react';

const ModalContent: FC<DialogContentProps> = ({ children, dividers, ...props }) => (
  <DialogContent {...props} dividers={dividers ?? true}>
    {children}
  </DialogContent>
);

export default ModalContent;
