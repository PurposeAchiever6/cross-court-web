import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'shared/history';
import LoginPage from 'screens/auth/pages/login';
import LandingPage from 'screens/landing';
import DashboardPage from 'screens/dashboard';
import PrivateRoute from './PrivateRoute';

const Routes = props => (
  <ConnectedRouter history={history}>
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} {...props} />
        <PrivateRoute path="/dashboard" component={DashboardPage} {...props} />
        <Route path="/" component={LandingPage} {...props} />
      </Switch>
    </main>
  </ConnectedRouter>
);

export default Routes;
