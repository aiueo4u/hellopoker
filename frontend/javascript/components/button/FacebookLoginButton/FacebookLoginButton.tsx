import * as React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from 'assets/facebook-icon.png';

import { useStyles } from './FacebookLoginButtonStyles';

export const FacebookLoginButton = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      startIcon={<Avatar src={FacebookIcon} className={classes.icon} />}
      className={classes.button}
      href="/auth/facebook"
    >
      Facebookでログイン
    </Button>
  );
};
