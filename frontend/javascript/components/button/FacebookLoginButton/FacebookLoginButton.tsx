import * as React from 'react';
import { Avatar, Button } from '@material-ui/core';
import FacebookIcon from 'assets/facebook-icon.png';

import { useStyles } from './FacebookLoginButtonStyles';

export const FacebookLoginButton = () => {
  const classes = useStyles();
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name=csrf-token]');
  const authenticityToken = csrfToken?.content || '';

  return (
    <form method="POST" action="/auth/facebook">
      <input type="hidden" name="authenticity_token" value={authenticityToken} />
      <Button
        variant="contained"
        startIcon={<Avatar src={FacebookIcon} className={classes.icon} />}
        className={classes.button}
        type="submit"
      >
        Facebookでログイン
      </Button>
    </form>
  );
};
