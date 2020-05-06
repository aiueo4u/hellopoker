import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ ...props }) {
  const { isLoggedIn } = useSelector(state => state.data.playerSession);
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
