import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';

export const SectionControlButtons: React.FC<SectionControlButtonsProps> = ({ onCancel, onEdit, onSave, editMode, saveDisabled, isLoading, showSection }) => {
  if (!showSection) return null;
  if (editMode)
    return (
      <Stack spacing={2} direction="row">
        <Button variant="contained" size="small" color="inherit" onClick={onCancel} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <LoadingButton disabled={saveDisabled} loading={isLoading} variant="contained" size="small" onClick={onSave} startIcon={<SaveIcon />}>
          Save
        </LoadingButton>
      </Stack>
    );
  if (!editMode)
    return (
      <Button variant="contained" size="small" onClick={onEdit} startIcon={<EditIcon fontSize="small" />}>
        Edit
      </Button>
    );

  return null;
};

export type SectionControlButtonsProps = {
  showSection: boolean;
  editMode?: boolean;
  onSave: () => void;
  onEdit: () => void;
  onCancel: () => void;
  saveDisabled?: boolean;
  isLoading?: boolean;
};
