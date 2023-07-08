import * as React from 'react';

import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  isOpen: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  children: React.ReactNode;
  submitButtonLabel: string;
};

export const Dialog = ({ isOpen, onClose, onSubmit, title, children, submitButtonLabel }: Props) => {
  return (
    <MuiDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {submitButtonLabel}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
