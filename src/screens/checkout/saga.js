import { put, takeLatest, call, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/series/reducer';
import { getSelectedCard } from 'screens/payments/reducer';
import {
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_FREE_SESSION_INIT,
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
} from './actionTypes';
import checkoutService from './service';

export function* createPurchaseFlow() {
  try {
    const selectedProduct = yield select(getSelectedProduct);
    const selectedCard = yield select(getSelectedCard);

    yield call(checkoutService.createPurchase, selectedProduct.stripe_id, selectedCard.id);
    yield put({
      type: CREATE_PURCHASE_SUCCESS,
    });
    yield put(push(ROUTES.CHECKOUTCONFIRMED));
  } catch (err) {
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
    yield put(push(ROUTES.CHECKOUTCONFIRMED));
  } catch (err) {
    yield put({ type: CREATE_FREE_SESSION_FAILURE, error: err.response.data.error });
  }
}

export default function* checkoutSaga() {
  yield all([
    takeLatest(CREATE_PURCHASE_INIT, createPurchaseFlow),
    takeLatest(CREATE_FREE_SESSION_INIT, createFreeSessionFlow),
  ]);
}
