import * as React from 'react';
import { Box, Button } from '@material-ui/core';

import ProfileImageDialog from 'components/profile/ProfileImageDialog';
import useDialogState from 'hooks/useDialogState';
import useLogout from 'hooks/useLogout';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

export const Setting = () => {
  const logout = useLogout();
  const { profileImageUrl } = usePlayerSessionState();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  return (
    <Box textAlign="center" mt={4}>
      <Box>
        <Button onClick={openDialog}>
          <img src={profileImageUrl} alt="" width="320px" />
        </Button>
        <ProfileImageDialog isOpen={isOpen} closeDialog={closeDialog} />
      </Box>
      <Box mt={2}>
        <Button variant="outlined" onClick={logout}>
          ログアウト
        </Button>
      </Box>
    </Box>
  );
};
