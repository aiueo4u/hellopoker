import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import TwitterIcon from 'assets/twitter-icon.svg';

import styles from './TwitterLoginButtonStyles';

const useStyles = makeStyles(styles);

const TwitterLoginButton = () => {
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

export default TwitterLoginButton;
