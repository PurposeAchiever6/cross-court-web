import { put, takeLatest, call, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/series/reducer';
import { getSelectedCard } from 'screens/payments/reducer';

import { getPromoCode } from './reducer';
import {
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_FREE_SESSION_INIT,
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
  CHECK_PROMO_CODE_INIT,
  CHECK_PROMO_CODE_SUCCESS,
  CHECK_PROMO_CODE_FAILURE,
} from './actionTypes';
import checkoutService from './service';

export function* createPurchaseFlow() {
  try {
    const selectedProduct = yield select(getSelectedProduct);
    const selectedCard = yield select(getSelectedCard);
    const promoCode = yield select(getPromoCode);

    yield call(
      checkoutService.createPurchase,
      selectedProduct.stripeId,
      selectedCard.id,
      promoCode
    );
    yield put({
      type: CREATE_PURCHASE_SUCCESS,
    });
    yield put(push(ROUTES.CHECKOUTCONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: CREATE_PURCHASE_FAILURE, error: err.response.data.error });
  }
}

export function* createFreeSessionFlow() {
  try {
    const selectedCard = yield select(getSelectedCard);

    yield call(checkoutService.createFreeSession, selectedCard.id);
    yield put({
      type: CREATE_FREE_SESSION_SUCCESS,
    });
    yield put(push(ROUTES.SESSIONRESERVED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: CREATE_FREE_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* checkPromoCodeFlow({ payload }) {
  try {
    const selectedProduct = yield select(getSelectedProduct);
    const { price } = yield call(
      checkoutService.checkPromoCode,
      payload.promoCode,
      selectedProduct.price
    );

    yield put({
      type: CHECK_PROMO_CODE_SUCCESS,
      payload: {
        price,
        promoCode: payload.promoCode,
      },
    });
  } catch (err) {
    yield call(toast.error, 'Invalid discount code');
    yield put({ type: CHECK_PROMO_CODE_FAILURE, error: err.response.data.error });
  }
}

export default function* checkoutSaga() {
  yield all([
    takeLatest(CREATE_PURCHASE_INIT, createPurchaseFlow),
    takeLatest(CREATE_FREE_SESSION_INIT, createFreeSessionFlow),
    takeLatest(CHECK_PROMO_CODE_INIT, checkPromoCodeFlow),
  ]);
}
