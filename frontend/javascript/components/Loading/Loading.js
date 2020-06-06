import React from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Loading = () => (
  <Box position="relative" height="100%" display="flex" flexDirection="column" justifyContent="center">
    <Box textAlign="center">
      <CircularProgress size={80} />
      <Typography>Loading...</Typography>
    </Box>
  </Box>
);

export default Loading;
