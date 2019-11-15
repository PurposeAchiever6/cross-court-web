import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from 'screens/auth/reducer';

// Implement immer.js

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });
