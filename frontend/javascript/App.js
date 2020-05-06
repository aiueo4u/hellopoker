import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import useAdjustWindow from 'hooks/useAdjustWindow';
import useInitApp from 'hooks/useInitApp';

import Home from './scenes/Home/index.js';
import Login from './scenes/Login';
import Lobby from './scenes/Lobby';
import TableList from './scenes/TableList';
import Room from './scenes/Room';

function App() {
  const { isReady } = useSelector(state => state.data.playerSession);
  useAdjustWindow();
  useInitApp();

  if (!isReady) return <Loading />;

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/tables" component={TableList} />
        <PrivateRoute exact path="/tables/new" component={Lobby} />
        <PrivateRoute exact path="/tables/:id" component={Room} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
