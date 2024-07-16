import { DialogTitleProps, DialogTitle, IconButton, Theme } from '@mui/material';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ModalTitle: FC<DialogTitleProps & { onClose?: () => void }> = ({ onClose, children, ...titleProps }) => {
  return (
    <DialogTitle {...titleProps}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: Theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default ModalTitle;
