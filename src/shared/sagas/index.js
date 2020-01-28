import { all } from 'redux-saga/effects';

import rootAppSaga from 'shared/sagas/appSaga';
import rootAuthSaga from 'screens/auth/saga';
import rootSemSessionSaga from 'screens/sem-session/saga';
import rootLocationSaga from 'screens/locations/saga';
import rootSessionSaga from 'screens/sessions/saga';
import rootSeriesSaga from 'screens/series/saga';
import rootMyAccountSaga from 'screens/my-account/saga';
import rootPurchaseHistorySaga from 'screens/purchase-history/saga';
import rootPaymentsSaga from 'screens/payments/saga';
import rootCheckoutSaga from 'screens/checkout/saga';
import rootLegalDocsSaga from 'screens/legal-docs/saga';

export default function* rootSaga() {
  yield all([
    rootAppSaga(),
    rootAuthSaga(),
    rootLocationSaga(),
    rootSessionSaga(),
    rootSeriesSaga(),
    rootSemSessionSaga(),
    rootMyAccountSaga(),
    rootPurchaseHistorySaga(),
    rootPaymentsSaga(),
    rootCheckoutSaga(),
    rootLegalDocsSaga(),
  ]);
}
