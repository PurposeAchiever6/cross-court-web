import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit } from 'screens/payment-methods/actionCreators';
import { updateSubscriptionPaymentMethod } from 'screens/products/actionCreators';
import { getUpdateSubscriptionPaymentMethodLoading } from 'screens/products/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { getPageLoading, getAvailableCards } from 'screens/payment-methods/reducer';
import PaymentMethods from 'screens/payment-methods/components/PaymentMethods';

const PaymentMethodsMembership = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoadingPage = useSelector(getPageLoading);
  const isLoadingUpdate = useSelector(getUpdateSubscriptionPaymentMethodLoading);
  const availablePaymentMethods = useSelector(getAvailableCards);
  const userProfile = useSelector(getUserProfile);
  const { activeSubscription } = userProfile;
  const loading = isLoadingPage || isLoadingUpdate;

  const selectedPaymentMethod = availablePaymentMethods.find((pm) => pm.withActiveSubscription);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const updateSubscriptionPaymentMethodHandler = (paymentMethod) => {
    dispatch(updateSubscriptionPaymentMethod(activeSubscription, paymentMethod));
  };

  const onDoneClick = () => {
    history.push(ROUTES.MANAGE_MEMBERSHIP);
  };

  if (!activeSubscription) {
    return <Redirect to={ROUTES.MANAGE_MEMBERSHIP} />;
  }

  return (
    <div className="min-h-screen py-20 md:py-24 px-4">
      <PaymentMethods
        title="Payment Methods"
        subtitle="Update your current membership payment method"
        submitBtnText="Done"
        selectedPaymentMethod={selectedPaymentMethod}
        availablePaymentMethods={availablePaymentMethods}
        onSelectCard={updateSubscriptionPaymentMethodHandler}
        onSubmitBtn={onDoneClick}
        loading={loading}
        className="max-w-xl mx-auto"
      />
    </div>
  );
};

export default PaymentMethodsMembership;
