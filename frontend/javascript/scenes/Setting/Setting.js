import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ProfileImageDialog from 'components/profile/ProfileImageDialog';
import useDialogState from 'hooks/useDialogState';
import useLogout from 'hooks/useLogout';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import useStyles from './SettingStyles';

const Setting = () => {
  const classes = useStyles();
  const logout = useLogout();
  const { profileImageUrl } = usePlayerSessionState();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  return (
    <div>
      <Box m={8}>
        <Box>
          <Button onClick={openDialog}>
            <img className={classes.profileImage} src={profileImageUrl} alt="" />
          </Button>
          <ProfileImageDialog isOpen={isOpen} closeDialog={closeDialog} />
        </Box>
        <Button variant="outlined" className={classes.button} onClick={logout}>
          ログアウト
        </Button>
      </Box>
    </div>
  );
};

export default Setting;
