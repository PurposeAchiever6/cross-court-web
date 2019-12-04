import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'shared/store/configureStore';
import Routes from './app/Routes';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Root;
