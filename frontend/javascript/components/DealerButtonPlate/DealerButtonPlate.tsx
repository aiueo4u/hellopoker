import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';

import { useDealerButtonPlateStyles } from './hooks/useDealerButtonPlateStyles';

export const DealerButtonPlate = () => {
  const classes = useDealerButtonPlateStyles();

  return (
    <Grid container className={classes.plate} direction="column" justify="center">
      <Grid item>
        <Typography className={classes.label}>D</Typography>
      </Grid>
    </Grid>
  );
};
