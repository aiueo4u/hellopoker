import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import useStyles from './CreateTournamentFormDialogStyles';
import useCreateTournamentFormDialog from './hooks/useCreateTournamentFormDialog';

const CreateTournamentFormDialog = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const { formData, onChangeFormData, onSubmit } = useCreateTournamentFormDialog(onClose);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>トーナメントの作成</DialogTitle>
      <DialogContent>
        <div className={classes.formGroup}>
          <TextField
            name="name"
            label="テーブル名"
            variant="outlined"
            value={formData.name}
            onChange={onChangeFormData}
            // disabled={isSending}
            autoFocus
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateTournamentFormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTournamentFormDialog;
