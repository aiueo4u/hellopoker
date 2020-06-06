import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './DealerButtonPlateStyles';

const DealerButtonPlate = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.plate} direction="column" justify="center">
      <Grid item>
        <Typography className={classes.label}>D</Typography>
      </Grid>
    </Grid>
  );
};

export default DealerButtonPlate;
