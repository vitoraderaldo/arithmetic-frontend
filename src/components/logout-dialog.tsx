import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { logoutUser } from "../util/auth/authentication.util";

interface LogoutDialogProps {
  isOpened: boolean;
  onCancel: () => void;
}

export const LogoutDialog = (props: LogoutDialogProps) => {

  const { 
    isOpened, 
    onCancel, 
  } = props;

  return (
    <Dialog open={isOpened} onClose={onCancel} maxWidth="xs">
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={logoutUser} color="primary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
