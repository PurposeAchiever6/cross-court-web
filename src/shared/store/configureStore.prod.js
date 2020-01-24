import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createRootReducer from 'shared/reducers';
import rootSaga from 'shared/sagas';
import { history } from 'shared/history';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
