import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/products/reducer';
import { getProrate, getProrateLoading } from 'screens/checkout/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import BackButton from 'shared/components/BackButton';
import { createPurchase, createSubscription, updateSubscription } from './actionCreators';
import { subscriptionProrate } from 'screens/checkout/actionCreators';
import PurchaseDetails from './components/PurchaseDetails';
import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector(getSelectedProduct);
  const paymentMethod = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);
  const prorate = useSelector(getProrate);
  const prorateLoading = useSelector(getProrateLoading);

  const productId = productDetails?.id;
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  const isSubscription = productDetails?.productType === RECURRING;

  useEffect(() => {
    if (isSubscription && productId && userHasActiveSubscription) {
      dispatch(subscriptionProrate(productId));
    }
  }, [userHasActiveSubscription, dispatch, isSubscription, productId]);

  if (isNil(productDetails) || isNil(paymentMethod)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const checkoutHandler = (params = {}) => {
    if (isSubscription && userHasActiveSubscription) {
      dispatch(updateSubscription());
    } else if (isSubscription && !userHasActiveSubscription) {
      dispatch(createSubscription());
    } else {
      dispatch(createPurchase(params));
    }
  };

  return (
    <>
      <BackButton className="mt-10 w-max" />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-shapiro95_super_wide text-2xl mb-8">PURCHASE DETAILS</h1>
        <PurchaseDetails
          prorate={prorate}
          prorateLoading={prorateLoading}
          productDetails={productDetails}
          paymentMethod={paymentMethod}
          checkoutHandler={checkoutHandler}
          userProfile={userProfile}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
