import * as React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TwitterIcon from 'assets/twitter-icon.svg';

import { useStyles } from './TwitterLoginButtonStyles';

export const TwitterLoginButton = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      startIcon={<Avatar src={TwitterIcon} className={classes.icon} />}
      href="/auth/twitter"
    >
      Twitterでログイン
    </Button>
  );
};
