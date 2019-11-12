import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'shared/history';
import LandingPage from 'screens/landing';

const Routes = props => (
  <ConnectedRouter history={history}>
    <main>
      <Switch>
        <Route path="/" component={LandingPage} {...props} />
      </Switch>
    </main>
  </ConnectedRouter>
);

export default Routes;
