import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';

import { history } from 'shared/history';
import colors from 'shared/styles/constants';
import routes from 'shared/constants/routes';

import Home from 'screens/homepage/HomePage';
import Login from 'screens/auth/pages/LoginPage';
import Dashboard from 'screens/dashboard/DashboardPage';
import Signup from 'screens/auth/pages/SignupPage';
import SignupSuccess from 'screens/auth/pages/SignupSuccess';
import SignupConfirmation from 'screens/auth/pages/SignupConfirmation';
import ForgotPass from 'screens/auth/pages/ForgotPassPage';
import ForgotPassSuccess from 'screens/auth/pages/ForgotPassSuccess';
import PassReset from 'screens/auth/pages/PassResetPage';
import PassResetSuccess from 'screens/auth/pages/PassResetSuccess';
import Header from 'shared/components/Header';

import PrivateRoute from './PrivateRoute';

const AppWrapper = styled.div`
  font-family: 'Untitled Sans';
  padding-top: 82px;

  a {
    color: ${colors.black};
  }

  main {
    overflow: hidden;
  }
`;

const Routes = () => (
  <AppWrapper>
    <ConnectedRouter history={history}>
      <Header />
      <main>
        <Switch>
          <Route path={routes.login}>
            <Login />
          </Route>
          <Route path={routes.signup} exact>
            <Signup />
          </Route>
          <Route path={routes.signupSuccess}>
            <SignupSuccess />
          </Route>
          <Route path={routes.signupConfirmation}>
            <SignupConfirmation />
          </Route>
          <Route path={routes.forgotPassword} exact>
            <ForgotPass />
          </Route>
          <Route path={routes.forgotPasswordSuccess}>
            <ForgotPassSuccess />
          </Route>
          <Route path={routes.resetPassword} exact>
            <PassReset />
          </Route>
          <Route path={routes.resetPasswordSuccess}>
            <PassResetSuccess />
          </Route>
          <Route path={routes.home}>
            <Home />
          </Route>
          <PrivateRoute path={routes.dashboard}>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </main>
    </ConnectedRouter>
  </AppWrapper>
);

export default Routes;
