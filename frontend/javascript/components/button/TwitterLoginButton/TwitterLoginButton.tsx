import * as React from 'react';

import { Avatar, Button } from '@material-ui/core';

import TwitterIcon from 'assets/twitter-icon.svg';

import { useStyles } from './TwitterLoginButtonStyles';

export const TwitterLoginButton = () => {
  const classes = useStyles();
  const csrfToken = document.querySelector<HTMLMetaElement>('meta[name=csrf-token]');
  const authenticityToken = csrfToken?.content || '';

  return (
    <form method="POST" action="/auth/twitter">
      <input type="hidden" name="authenticity_token" value={authenticityToken} />
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Avatar src={TwitterIcon} className={classes.icon} />}
        type="submit"
      >
        Twitterでログイン
      </Button>
    </form>
  );
};
