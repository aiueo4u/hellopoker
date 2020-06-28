import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import SideNavigation from 'components/SideNavigation';
import useAdjustWindow from 'hooks/useAdjustWindow';
import useInitApp from 'hooks/useInitApp';

import Home from 'scenes/Home/index.js';
import Login from 'scenes/Login';
import Lobby from 'scenes/Lobby';
import TableList from 'scenes/TableList';
import Tournament from 'scenes/Tournament';
import TournamentList from 'scenes/TournamentList';
import Room from 'scenes/Room';
import Setting from 'scenes/Setting';

import useStyles from './AppStyles';

function App() {
  const classes = useStyles();
  const { isReady } = useSelector(state => state.data.playerSession);
  useAdjustWindow();
  useInitApp();

  if (!isReady) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route>
          <div className={classes.sideBar}>
            <SideNavigation />
          </div>
          <div className={classes.content}>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/tables" component={TableList} />
              <PrivateRoute exact path="/tables/new" component={Lobby} />
              <PrivateRoute exact path="/tables/:id" component={Room} />
              <PrivateRoute exact path="/settings" component={Setting} />
              <PrivateRoute exact path="/tournaments" component={TournamentList} />
              <PrivateRoute exact path="/tournaments/:id" component={Tournament} />
            </Switch>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
