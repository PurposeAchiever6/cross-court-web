import { put, takeLatest, call, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import toast from 'shared/utils/toast';
import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/products/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';
import { GET_PROFILE_INIT } from 'screens/my-account/actionTypes';
import { RESERVE_SESSION_INIT } from 'screens/sessions/actionTypes';
import paymentMethodsService from 'screens/payment-methods/service';
import productsService from 'screens/products/service';

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

export function* createPurchaseFlow({ payload, options }) {
  try {
    const { product, paymentMethod, promoCode, useCcCash } = payload;
    const { addPaymentMethod } = options;

    const selectedProduct = product || (yield select(getSelectedProduct));
    const selectedCard = paymentMethod || (yield select(getSelectedCard));
    const selectedPromoCode = promoCode || (yield select(getPromoCode));
    const userProfile = yield select(getUserProfile);
    const { activeSubscription } = userProfile;

    let paymentMethodId = selectedCard.id;

    if (addPaymentMethod) {
      const addedPaymentMethod = yield call(
        paymentMethodsService.addPaymentMethod,
        selectedCard.id
      );

      paymentMethodId = addedPaymentMethod.id;
    }

    yield call(
      checkoutService.createPurchase,
      selectedProduct.id,
      paymentMethodId,
      selectedPromoCode,
      useCcCash
    );

    if (activeSubscription?.id && selectedProduct.seasonPass) {
      yield call(productsService.cancelSubscription, activeSubscription.id);
    }

    yield put({ type: CREATE_PURCHASE_SUCCESS });
    yield put({ type: GET_PROFILE_INIT });
    yield put(push(ROUTES.CHECKOUT_CONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: CREATE_PURCHASE_FAILURE, error: err.response.data.error });
  }
}

export function* createFreeSessionFlow({ payload }) {
  try {
    const selectedCard = yield select(getSelectedCard);

    yield call(checkoutService.createFreeSession, selectedCard.id);
    yield put({
      type: CREATE_FREE_SESSION_SUCCESS,
    });
    yield put({
      type: RESERVE_SESSION_INIT,
      payload,
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: CREATE_FREE_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* checkPromoCodeFlow({ payload }) {
  try {
    const userProfile = yield select(getUserProfile);
    const { activeSubscription } = userProfile;
    const selectedProduct = yield select(getSelectedProduct);
    const productId = selectedProduct.id;

    const { price } = yield call(checkoutService.checkPromoCode, payload.promoCode, productId);

    if (activeSubscription && selectedProduct.productType === RECURRING) {
      const params = { product_id: productId, promo_code: payload.promoCode };
      yield put({ type: SUBSCRIPTION_PRORATE_INIT, payload: params });
    }

    yield put({
      type: CHECK_PROMO_CODE_SUCCESS,
      payload: {
        price,
        promoCode: payload.promoCode,
      },
    });
  } catch (err) {
    const errorDetails = err.response.data.error || 'Invalid discount code';
    yield call(toast.error, errorDetails);
    yield put({ type: CHECK_PROMO_CODE_FAILURE, error: errorDetails });
  }
}

export function* createSubscriptionFlow({ payload, options }) {
  try {
    const { product, paymentMethod, promoCode } = payload;
    const { addPaymentMethod } = options;

    const selectedProduct = product || (yield select(getSelectedProduct));
    const selectedCard = paymentMethod || (yield select(getSelectedCard));
    const selectedPromoCode = promoCode || (yield select(getPromoCode));

    let paymentMethodId = selectedCard.id;

    if (addPaymentMethod) {
      const addedPaymentMethod = yield call(
        paymentMethodsService.addPaymentMethod,
        selectedCard.id
      );

      paymentMethodId = addedPaymentMethod.id;
    }

    const subscription = yield call(
      checkoutService.createSubscription,
      selectedProduct.id,
      paymentMethodId,
      selectedPromoCode
    );

    yield put({
      type: CREATE_SUBSCRIPTION_SUCCESS,
      payload: {
        subscription,
      },
    });
    yield put({ type: GET_PROFILE_INIT });
    yield put(push(ROUTES.CHECKOUT_MEMBERSHIP_CONFIRMED));
  } catch (err) {
    yield call(toast.error, err.response.data.error);

    yield put({ type: CREATE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* updateSubscriptionFlow() {
  try {
    const selectedProduct = yield select(getSelectedProduct);
    const selectedCard = yield select(getSelectedCard);
    const promoCode = yield select(getPromoCode);
    const userProfile = yield select(getUserProfile);
    const { activeSubscription } = userProfile;

    const subscription = yield call(
      checkoutService.updateSubscription,
      activeSubscription.id,
      selectedProduct.id,
      selectedCard.id,
      promoCode
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
    const prorate = yield call(checkoutService.subscriptionProrate, payload);
    yield put({ type: SUBSCRIPTION_PRORATE_SUCCESS, payload: { prorate } });
  } catch (err) {
    yield put({ type: SUBSCRIPTION_PRORATE_FAILURE, error: err.response.data.error });
  }
}

export default function* checkoutSaga() {
  yield all([
    takeLatest(CREATE_PURCHASE_INIT, createPurchaseFlow),
    takeLatest(CREATE_SUBSCRIPTION_INIT, createSubscriptionFlow),
    takeLatest(UPDATE_SUBSCRIPTION_INIT, updateSubscriptionFlow),
    takeLatest(CREATE_FREE_SESSION_INIT, createFreeSessionFlow),
    takeLatest(CHECK_PROMO_CODE_INIT, checkPromoCodeFlow),
    takeLatest(SUBSCRIPTION_PRORATE_INIT, subscriptionProrateFlow),
  ]);
}
