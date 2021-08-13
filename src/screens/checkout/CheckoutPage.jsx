import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/products/reducer';
import { getSelectedCard } from 'screens/payments/reducer';
import BackButton from 'shared/components/BackButton';
import { createPurchase, createSubscription, updateSubscription } from './actionCreators';
import PurchaseDetails from './components/PurchaseDetails';
import { getUserProfile } from 'screens/my-account/reducer';
import { RECURRING } from 'screens/products/constants';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(getSelectedProduct);
  const paymentDetails = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);

  if (isNil(productDetails) || isNil(paymentDetails)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const isSubscription = productDetails.productType === RECURRING;
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  let action;

  if (isSubscription && userHasActiveSubscription) {
    action = updateSubscription();
  } else if (isSubscription && !userHasActiveSubscription) {
    action = createSubscription();
  } else {
    action = createPurchase();
  }

  const createPurchaseHandler = () => dispatch(action);

  return (
    <>
      <BackButton className="mt-10 w-max" />
      <div className="checkout text-2xl md:text-base min-h-screen flex flex-col items-center justify-center">
        <h1 className="mb-8">PURCHASE DETAILS</h1>
        <PurchaseDetails
          productDetails={productDetails}
          paymentDetails={paymentDetails}
          createPurchaseHandler={createPurchaseHandler}
          userHasActiveSubscription={userHasActiveSubscription}
        />
      </div>
    </>
  );
};

export default CheckoutPage;
