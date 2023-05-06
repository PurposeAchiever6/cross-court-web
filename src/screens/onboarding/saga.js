import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'shared/utils/toast';

import ROUTES from 'shared/constants/routes';
import {
  SET_PAYMENT_METHOD_INIT,
  SET_PAYMENT_METHOD_SUCCESS,
  SET_PAYMENT_METHOD_FAILURE,
  SET_PROMO_CODE_INIT,
  SET_PROMO_CODE_SUCCESS,
  SET_PROMO_CODE_FAILURE,
} from 'screens/onboarding/actionTypes';
import paymentMethodsService from 'screens/payment-methods/service';
import checkoutService from 'screens/checkout/service';

export function* setPaymentMethodFlow({ payload }) {
  try {
    const { stripe, cardElement } = payload;

    const paymentMethod = yield call(
      paymentMethodsService.createPaymentMethod,
      stripe,
      cardElement
    );

    yield put({
      type: SET_PAYMENT_METHOD_SUCCESS,
      payload: { paymentMethod },
    });
    yield put(push(ROUTES.ONBOARDING_REVIEW));
  } catch (err) {
    yield call(toast.error, err.message);
    yield put({ type: SET_PAYMENT_METHOD_FAILURE });
  }
}

export function* setPromoCodeFlow({ payload }) {
  try {
    const { promoCode, product } = payload;

    const { price } = yield call(checkoutService.checkPromoCode, promoCode, product.id);

    yield put({
      type: SET_PROMO_CODE_SUCCESS,
      payload: {
        price,
        promoCode,
      },
    });
  } catch (err) {
    const error = err.response.data.error || 'Invalid discount code';
    yield call(toast.error, error);
    yield put({ type: SET_PROMO_CODE_FAILURE });
  }
}

export default function* onboardingSaga() {
  yield all([takeLatest(SET_PAYMENT_METHOD_INIT, setPaymentMethodFlow)]);
  yield all([takeLatest(SET_PROMO_CODE_INIT, setPromoCodeFlow)]);
}
