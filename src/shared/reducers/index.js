import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'screens/auth/reducer';
import locationsReducer from 'screens/locations/reducer';
import sessionReducer from 'screens/sessions/reducer';
import productsReducer from 'screens/products/reducer';
import myAccountReducer from 'screens/my-account/reducer';
import paymentHistoryReducer from 'screens/payment-history/reducer';
import paymentMethodsReducer from 'screens/payment-methods/reducer';
import checkoutReducer from 'screens/checkout/reducer';
import sessionsSurveysReducer from 'screens/surveys/sessions/reducer';
import galleryReducer from 'screens/gallery/reducer';
import referralsReducer from 'screens/referrals/reducer';

import { LOGOUT_INIT } from 'screens/auth/actionTypes';

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    locations: locationsReducer,
    session: sessionReducer,
    products: productsReducer,
    myAccount: persistReducer(
      {
        key: 'myAccount',
        storage,
      },
      myAccountReducer
    ),
    paymentHistory: paymentHistoryReducer,
    paymentMethods: paymentMethodsReducer,
    checkout: checkoutReducer,
    sessionsSurveys: sessionsSurveysReducer,
    gallery: galleryReducer,
    referrals: referralsReducer,
  });

export default (history) => (state, action) => {
  if (action.type === LOGOUT_INIT) {
    state = undefined;
  }

  return appReducer(history)(state, action);
};
