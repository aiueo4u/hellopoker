import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from 'components/Loading';
import PrivateRoute from './components/PrivateRoute';
import Home from './scenes/Home/index.js';
import Login from './scenes/Login';
import Lobby from './scenes/Lobby';
import TableList from './scenes/TableList';
import Room from './scenes/Room';

function App() {
  useEffect(() => {
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      window.document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    const vh = window.innerHeight * 0.01;
    window.document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const { isReady } = useSelector(state => state.data.playerSession);

  if (!isReady) return <Loading />;

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/tables" component={TableList} />
        <PrivateRoute exact path="/tables/new" component={Lobby} />
        <PrivateRoute exact path="/tables/:id" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
