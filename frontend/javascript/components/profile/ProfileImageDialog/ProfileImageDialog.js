import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import useProfileImageDialog from './hooks/useProfileImageDialog';
import useStyles from './ProfileImageDialogStyles';

const ProfileImageDialog = ({ closeDialog, isOpen }) => {
  const classes = useStyles();
  const { onChange, onClose, onSubmit, profileImageFile, profileImagePreviewSrc, updating } = useProfileImageDialog({
    closeDialog,
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>プロフィール画像変更</DialogTitle>
      <DialogContent>
        <input className={classes.input} disabled={updating} type="file" onChange={onChange} />
        {profileImagePreviewSrc && <img className={classes.preview} src={profileImagePreviewSrc} alt="" />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={updating}>
          キャンセル
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit} disabled={updating || !profileImageFile}>
          アップロード
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProfileImageDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default memo(ProfileImageDialog);
