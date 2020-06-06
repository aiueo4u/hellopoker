import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from 'assets/facebook-icon.png';

import styles from './FacebookLoginButtonStyles';

const useStyles = makeStyles(styles);

const FacebookLoginButton = () => {
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

export default FacebookLoginButton;
