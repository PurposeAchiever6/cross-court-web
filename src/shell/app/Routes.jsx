import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';

import { history } from 'shared/history';
import colors from 'shared/styles/constants';
import routes from 'shared/constants/routes';

import LoginPage from 'screens/auth/pages/LoginPage';
import HomePage from 'screens/homepage/HomePage';
import DashboardPage from 'screens/dashboard/DashboardPage';
import SignupPage from 'screens/auth/pages/SignupPage';
import SignupSuccessPage from 'screens/auth/pages/SignupSuccess';
import SignupConfirmationPage from 'screens/auth/pages/SignupConfirmation';
import ForgotPassPage from 'screens/auth/pages/ForgotPassPage';
import ForgotPassSuccessPage from 'screens/auth/pages/ForgotPassSuccess';
import PassResetPage from 'screens/auth/pages/PassResetPage';
import PassResetSuccessPage from 'screens/auth/pages/PassResetSuccess';
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
          <Route path={routes.forgotPassword} exact component={ForgotPassPage} {...props} />
          <Route path={routes.forgotPasswordSuccess} component={ForgotPassSuccessPage} {...props} />
          <Route path={routes.resetPassword} exact component={PassResetPage} {...props} />
          <Route path={routes.resetPasswordSuccess} component={PassResetSuccessPage} {...props} />
          <PrivateRoute path={routes.dashboard} component={DashboardPage} {...props} />
          <Route path={routes.home} component={HomePage} exact {...props} />
        </Switch>
      </main>
    </ConnectedRouter>
  </AppWrapper>
);

export default Routes;
