import { put, takeLatest, call, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import toast from 'shared/utils/toast';
import ROUTES from 'shared/constants/routes';
import { getUserProfile } from 'screens/my-account/reducer';
import { GET_PROFILE_INIT } from 'screens/my-account/actionTypes';
import paymentMethodsService from 'screens/payment-methods/service';
import productsService from 'screens/products/service';

import {
  SET_PROMO_CODE_INIT,
  SET_PROMO_CODE_SUCCESS,
  SET_PROMO_CODE_FAILURE,
  CREATE_PURCHASE_INIT,
  CREATE_PURCHASE_SUCCESS,
  CREATE_PURCHASE_FAILURE,
  CREATE_SUBSCRIPTION_INIT,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_INIT,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PRORATE_INIT,
  SUBSCRIPTION_PRORATE_SUCCESS,
  SUBSCRIPTION_PRORATE_FAILURE,
} from './actionTypes';
import checkoutService from './service';

export function* setPromoCodeFlow({ payload }) {
  try {
    const { promoCode: promoCodeString, product } = payload;

    const { promoCode } = yield call(checkoutService.checkPromoCode, promoCodeString, product.id);

    yield put({
      type: SET_PROMO_CODE_SUCCESS,
      payload: { promoCode },
    });
  } catch (err) {
    const error = err.response.data.error || 'Invalid discount code';
    yield call(toast.error, error);
    yield put({ type: SET_PROMO_CODE_FAILURE });
  }
}

export function* createPurchaseFlow({ payload, options }) {
  try {
    const { product, paymentMethod, promoCode, useCcCash } = payload;
    const { addPaymentMethod, callAction } = options;

    const userProfile = yield select(getUserProfile);
    const { activeSubscription } = userProfile;

    let paymentMethodId = paymentMethod.id;

    if (addPaymentMethod) {
      const addedPaymentMethod = yield call(
        paymentMethodsService.addPaymentMethod,
        paymentMethodId
      );

      paymentMethodId = addedPaymentMethod.id;
    }

    yield call(
      checkoutService.createPurchase,
      product.id,
      paymentMethodId,
      promoCode?.code,
      useCcCash
    );

    if (activeSubscription && product.seasonPass) {
      yield call(productsService.cancelSubscription, activeSubscription.id);
    }

    if (callAction) {
      yield put(callAction);
    }

    yield put({ type: CREATE_PURCHASE_SUCCESS });
    yield put({ type: GET_PROFILE_INIT });
    yield put(push(ROUTES.CHECKOUT_CONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: CREATE_PURCHASE_FAILURE, error: err.response.data.error });
  }
}

export function* createSubscriptionFlow({ payload, options }) {
  try {
    const { product, paymentMethod, promoCode } = payload;
    const { addPaymentMethod, callAction } = options;

    let paymentMethodId = paymentMethod.id;

    if (addPaymentMethod) {
      const addedPaymentMethod = yield call(
        paymentMethodsService.addPaymentMethod,
        paymentMethodId
      );

      paymentMethodId = addedPaymentMethod.id;
    }

    const subscription = yield call(
      checkoutService.createSubscription,
      product.id,
      paymentMethodId,
      promoCode?.code
    );

    if (callAction) {
      yield put(callAction);
    }

    yield put({
      type: CREATE_SUBSCRIPTION_SUCCESS,
      payload: { subscription },
    });
    yield put({ type: GET_PROFILE_INIT });
    yield put(push(ROUTES.CHECKOUT_MEMBERSHIP_CONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: CREATE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* updateSubscriptionFlow({ payload }) {
  try {
    const { product, paymentMethod, promoCode } = payload;

    const userProfile = yield select(getUserProfile);
    const { activeSubscription } = userProfile;

    const subscription = yield call(
      checkoutService.updateSubscription,
      activeSubscription.id,
      product.id,
      paymentMethod.id,
      promoCode?.code
    );

    yield put({
      type: UPDATE_SUBSCRIPTION_SUCCESS,
      payload: {
        subscription,
      },
    });
    yield put({ type: GET_PROFILE_INIT });
    yield put(push(ROUTES.MYACCOUNT));
    yield call(toast.success, 'Membership updated.');
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: UPDATE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* subscriptionProrateFlow({ payload }) {
  try {
    const { productId, promoCode } = payload;
    const { prorate } = yield call(checkoutService.subscriptionProrate, productId, promoCode?.code);
    yield put({
      type: SUBSCRIPTION_PRORATE_SUCCESS,
      payload: { prorate, withPromoCode: !!promoCode },
    });
  } catch (err) {
    yield put({ type: SUBSCRIPTION_PRORATE_FAILURE, error: err.response.data.error });
  }
}

export default function* checkoutSaga() {
  yield all([
    takeLatest(SET_PROMO_CODE_INIT, setPromoCodeFlow),
    takeLatest(CREATE_PURCHASE_INIT, createPurchaseFlow),
    takeLatest(CREATE_SUBSCRIPTION_INIT, createSubscriptionFlow),
    takeLatest(UPDATE_SUBSCRIPTION_INIT, updateSubscriptionFlow),
    takeLatest(SUBSCRIPTION_PRORATE_INIT, subscriptionProrateFlow),
  ]);
}
