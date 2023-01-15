import * as React from 'react';

import { Box, CircularProgress, Dialog, DialogTitle } from '@material-ui/core';

export const NetworkStatusDialog = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>再接続中...</DialogTitle>
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    </Dialog>
  );
};
