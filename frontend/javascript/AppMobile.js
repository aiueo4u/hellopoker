import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalMenu from 'components/navigation/GlobalMenu';
import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import useAdjustWindow from 'hooks/useAdjustWindow';
import useInitApp from 'hooks/useInitApp';

import Home from 'scenes/mobile/Home/index.js';
import Login from 'scenes/Login';
import Lobby from 'scenes/Lobby';
import TableList from 'scenes/TableList';
import Tournament from 'scenes/Tournament';
import TournamentList from 'scenes/TournamentList';
import Room from 'scenes/Room';
import Setting from 'scenes/Setting';

function App() {
  const { isReady } = useSelector(state => state.data.playerSession);
  useAdjustWindow();
  useInitApp();

  if (!isReady) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route>
          <GlobalMenu />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/tables" component={TableList} />
            <PrivateRoute exact path="/tables/new" component={Lobby} />
            <PrivateRoute exact path="/tables/:id" component={Room} />
            <PrivateRoute exact path="/settings" component={Setting} />
            <PrivateRoute exact path="/tournaments" component={TournamentList} />
            <PrivateRoute exact path="/tournaments/:id" component={Tournament} />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
