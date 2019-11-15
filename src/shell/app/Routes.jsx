import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';

import { history } from 'shared/history';
import LoginPage from 'screens/auth/pages/LoginPage';
import LandingPage from 'screens/landing/LandingPage';
import DashboardPage from 'screens/dashboard/DashboardPage';
import colors from 'shared/styles/constants';
import PrivateRoute from './PrivateRoute';

const AppWrapper = styled.div`
  font-family: 'Untitled Sans';

  a {
    color: ${colors.black};
  }
`;

const Routes = props => (
  <AppWrapper>
    <ConnectedRouter history={history}>
      <main>
        <Switch>
          <Route path="/login" component={LoginPage} {...props} />
          <PrivateRoute path="/dashboard" component={DashboardPage} {...props} />
          <Route path="/" component={LandingPage} {...props} />
        </Switch>
      </main>
    </ConnectedRouter>
  </AppWrapper>
);

export default Routes;
