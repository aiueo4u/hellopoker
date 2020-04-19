import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  plate: {
    width: '24px',
    margin: '0 auto',
    background: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: '50%',
    boxShadow: '1px 1px 1px 1px black',
  },
  label: {
    lineHeight: '24px',
  },
});

const DealerButtonPlate = ({ classes }) => (
  <Grid container className={classes.plate} direction="column" justify="center">
    <Grid item>
      <Typography className={classes.label}>D</Typography>
    </Grid>
  </Grid>
);

export default withStyles(styles)(DealerButtonPlate);
