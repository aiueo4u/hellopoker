import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import FacebookLoginButton from 'components/FacebookLoginButton';
import TwitterLoginButton from 'components/TwitterLoginButton';

import LoginForm from './components/LoginForm';

import styles from './LoginStyles';

const useStyles = makeStyles(styles);

function Login() {
  const classes = useStyles();
  const { isLoggedIn } = useSelector(state => state.data.playerSession)

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

export default Login;
