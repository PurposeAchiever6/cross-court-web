import React from 'react';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';

import configureStore from 'shared/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './app/Routes';

const { store, persistor } = configureStore();

const Root = () => {
  return (
    <HttpsRedirect>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </HttpsRedirect>
  );
};

export default Root;
