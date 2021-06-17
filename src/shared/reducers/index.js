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
import paymentsReducer from 'screens/payments/reducer';
import checkoutReducer from 'screens/checkout/reducer';
import legalDocsReducer from 'screens/legal-docs/reducer';

export default (history) =>
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
    payments: paymentsReducer,
    checkout: checkoutReducer,
    legalDocs: persistReducer(
      {
        key: 'legalDocs',
        storage,
      },
      legalDocsReducer
    ),
  });
