import * as React from 'react';

import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import TopNavigation from 'components/navigation/desktop/TopNavigation';
import useAdjustWindow from 'hooks/useAdjustWindow';
import useInitApp from 'hooks/useInitApp';
import { Home } from 'scenes/desktop/Home';
import { Lobby } from 'scenes/desktop/Lobby';
import { Login } from 'scenes/desktop/Login';
import { Room } from 'scenes/desktop/Room';
import { Setting } from 'scenes/desktop/Setting';
import { TableList } from 'scenes/desktop/TableList';
import { Tournament } from 'scenes/desktop/Tournament';
import { TournamentList } from 'scenes/desktop/TournamentList';

export const App = () => {
  const { isReady } = useSelector((state: any) => state.data.playerSession);

  useAdjustWindow();
  useInitApp();

  if (!isReady) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route>
          <TopNavigation />
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
};
