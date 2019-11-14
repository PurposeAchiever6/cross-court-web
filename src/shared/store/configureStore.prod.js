import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from 'shared/reducers';
import rootSaga from 'shared/sagas';
import { history } from 'shared/history';

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
