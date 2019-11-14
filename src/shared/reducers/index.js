import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Implement immer.js

export default history =>
  combineReducers({
    router: connectRouter(history),
  });
