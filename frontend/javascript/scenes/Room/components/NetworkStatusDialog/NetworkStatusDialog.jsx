import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const NetworkStatusDialog = ({ isOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>再接続中...</DialogTitle>
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    </Dialog>
  );
};

NetworkStatusDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default NetworkStatusDialog;
