import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'screens/auth/reducer';
import locationsReducer from 'screens/locations/reducer';
import sessionReducer from 'screens/sessions/reducer';
import productsReducer from 'screens/products/reducer';
import myAccountReducer from 'screens/my-account/reducer';
import purchaseHistoryReducer from 'screens/purchase-history/reducer';
import paymentMethodsReducer from 'screens/payment-methods/reducer';
import checkoutReducer from 'screens/checkout/reducer';
import legalDocsReducer from 'screens/legal-docs/reducer';
import surveyReducer from 'screens/survey/reducer';
import galleryReducer from 'screens/gallery/reducer';

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
    purchaseHistory: purchaseHistoryReducer,
    paymentMethods: paymentMethodsReducer,
    checkout: checkoutReducer,
    survey: surveyReducer,
    legalDocs: persistReducer(
      {
        key: 'legalDocs',
        storage,
      },
      legalDocsReducer
    ),
    gallery: galleryReducer,
  });

export default (history) => (state, action) => {
  if (action.type === LOGOUT_INIT) {
    state = undefined;
  }

  return appReducer(history)(state, action);
};
