import React from 'react';

import { Box, Typography } from '@material-ui/core';
import useStyles from './HomeStyles';

const Home = () => {
  const classes = useStyles();

  return (
    <Box p={2}>
      <Typography variant="h5" align="center">Hello Poker</Typography>
    </Box>
  );
};

export default Home;
