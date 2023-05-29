import React from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface RecordDeleteDialogProps {
  isOpened: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirmation: () => void;
}

export const RecordDeleteDialog = (props: RecordDeleteDialogProps) => {

  const { 
    isOpened, 
    isDeleting, 
    onCancel, 
    onConfirmation 
  } = props;

  return (
    <Dialog open={isOpened} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!isDeleting && 
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        }
        <Button onClick={onConfirmation} color="primary">
        {isDeleting ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
