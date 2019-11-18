import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';

import { history } from 'shared/history';
import colors from 'shared/styles/constants';
import routes from 'shared/constants/routes';

import LoginPage from 'screens/auth/pages/LoginPage';
import LandingPage from 'screens/landing/LandingPage';
import DashboardPage from 'screens/dashboard/DashboardPage';
import SignupPage from 'screens/auth/pages/SignupPage';
import SignupSuccessPage from 'screens/auth/pages/SignupSuccess';
import SignupConfirmationPage from 'screens/auth/pages/SignupConfirmation';

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
          <Route path={routes.login} component={LoginPage} {...props} />
          <Route path={routes.signup} exact component={SignupPage} {...props} />
          <Route path={routes.signupSuccess} component={SignupSuccessPage} {...props} />
          <Route path={routes.signupConfirmation} component={SignupConfirmationPage} {...props} />
          <PrivateRoute path={routes.dashboard} component={DashboardPage} {...props} />
          <Route path={routes.home} component={LandingPage} {...props} />
        </Switch>
      </main>
    </ConnectedRouter>
  </AppWrapper>
);

export default Routes;
