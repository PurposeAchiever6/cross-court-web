import { all } from 'redux-saga/effects';

import rootAppSaga from 'shared/sagas/appSaga';
import rootAuthSaga from 'screens/auth/saga';
import rootLocationSaga from 'screens/locations/saga';
import rootSessionSaga from 'screens/sessions/saga';
import rootProductsSaga from 'screens/products/saga';
import rootMyAccountSaga from 'screens/my-account/saga';
import rootPurchaseHistorySaga from 'screens/purchase-history/saga';
import rootPaymentMethodsSaga from 'screens/payment-methods/saga';
import rootCheckoutSaga from 'screens/checkout/saga';
import rootLegalDocsSaga from 'screens/legal-docs/saga';
import rootSurveySaga from 'screens/survey/saga';
import rootGallerySaga from 'screens/gallery/saga';

export default function* rootSaga() {
  yield all([
    rootAppSaga(),
    rootAuthSaga(),
    rootLocationSaga(),
    rootSessionSaga(),
    rootProductsSaga(),
    rootMyAccountSaga(),
    rootPurchaseHistorySaga(),
    rootPaymentMethodsSaga(),
    rootCheckoutSaga(),
    rootLegalDocsSaga(),
    rootSurveySaga(),
    rootGallerySaga(),
  ]);
}
