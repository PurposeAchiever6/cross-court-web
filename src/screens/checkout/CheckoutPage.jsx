import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { RECURRING } from 'screens/products/constants';
import { getSelectedProduct } from 'screens/products/reducer';
import { getProrate, getProrateLoading } from 'screens/checkout/reducer';
import { getSelectedCard } from 'screens/payment-methods/reducer';
import {
  createPurchase,
  createSubscription,
  updateSubscription,
  subscriptionProrate,
} from 'screens/checkout/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import MembershipPurchaseConfirmationModal from 'screens/checkout/components/MembershipPurchaseConfirmationModal';
import MembershipPromoCodeAlert from 'screens/checkout/components/MembershipPromoCodeAlert';
import PurchaseDetails from 'screens/checkout/components/PurchaseDetails';

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector(getSelectedProduct);
  const paymentMethod = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);
  const prorate = useSelector(getProrate);
  const prorateLoading = useSelector(getProrateLoading);

  const [showMembershipConfirmationModal, setShowMembershipConfirmationModal] = useState(false);

  const productId = productDetails?.id;
  const userHasActiveSubscription = !!userProfile.activeSubscription;
  const userActiveSubscriptionNotPaused = !userProfile.activeSubscription?.paused;
  const userHasPlayedAnySession = !!userProfile.lastCheckedInUserSession;
  const isSubscription = productDetails?.productType === RECURRING;
  const showMembershipPromoCodeAlert =
    isSubscription && !userHasActiveSubscription && !userHasPlayedAnySession;

  useEffect(() => {
    if (
      isSubscription &&
      productId &&
      userHasActiveSubscription &&
      userActiveSubscriptionNotPaused
    ) {
      dispatch(subscriptionProrate(productId));
    }
  }, [
    dispatch,
    isSubscription,
    productId,
    userHasActiveSubscription,
    userActiveSubscriptionNotPaused,
  ]);

  const checkoutHandler = (params = {}) => {
    if (isSubscription && userHasActiveSubscription) {
      dispatch(updateSubscription());
    } else if (isSubscription && !userHasActiveSubscription) {
      setShowMembershipConfirmationModal(true);
    } else {
      dispatch(createPurchase(params));
    }
  };

  const createSubscriptionHandler = () => {
    setShowMembershipConfirmationModal(false);
    dispatch(createSubscription());
  };

  if (isNil(productDetails) || isNil(paymentMethod)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="font-shapiro95_super_wide text-2xl mb-8">PURCHASE DETAILS</h1>
        <div className="w-full max-w-screen-md">
          {showMembershipPromoCodeAlert && <MembershipPromoCodeAlert className="mb-2" />}
          <PurchaseDetails
            prorate={prorate}
            prorateLoading={prorateLoading}
            productDetails={productDetails}
            paymentMethod={paymentMethod}
            checkoutHandler={checkoutHandler}
            userProfile={userProfile}
          />
        </div>
      </div>
      <MembershipPurchaseConfirmationModal
        isOpen={showMembershipConfirmationModal}
        closeHandler={() => setShowMembershipConfirmationModal(false)}
        onConfirm={createSubscriptionHandler}
      />
    </>
  );
};

export default CheckoutPage;
