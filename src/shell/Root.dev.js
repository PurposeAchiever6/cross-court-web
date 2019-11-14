import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'shared/store/configureStore';
import AppContainer from 'shell/app/AppContainer';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default Root;
