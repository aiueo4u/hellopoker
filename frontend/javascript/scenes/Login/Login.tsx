import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Box, Typography } from '@material-ui/core';

import { FacebookLoginButton } from 'components/button/FacebookLoginButton';
import { TwitterLoginButton } from 'components/button/TwitterLoginButton';
import { LoginForm } from 'components/form/LoginForm';

import { useStyles } from './LoginStyles';

export const Login = () => {
  const classes = useStyles();
  const { isLoggedIn } = useSelector((state: any) => state.data.playerSession);

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <div className={classes.container}>
      <Typography variant="h6">ログインしてください</Typography>
      <Box mt={2}>
        <TwitterLoginButton />
      </Box>
      <Box mt={2}>
        <FacebookLoginButton />
      </Box>
      <Box mt={5}>
        <LoginForm />
      </Box>
    </div>
  );
};
