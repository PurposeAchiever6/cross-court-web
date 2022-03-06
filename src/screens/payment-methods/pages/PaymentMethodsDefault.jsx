import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit } from 'screens/payment-methods/actionCreators';
import { updateCard } from 'screens/payment-methods/actionCreators';
import { getUserProfile } from 'screens/my-account/reducer';
import { getPageLoading, getAvailableCards } from 'screens/payment-methods/reducer';
import Loading from 'shared/components/Loading';
import PaymentMethods from 'screens/payment-methods/components/PaymentMethods';

const PaymentMethodsDefault = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoadingPage = useSelector(getPageLoading);
  const availablePaymentMethods = useSelector(getAvailableCards);
  const userProfile = useSelector(getUserProfile);

  const selectedPaymentMethod = userProfile.defaultPaymentMethod;

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const updatePaymentMethodAsDefault = (paymentMethod) => {
    dispatch(updateCard(paymentMethod.id, { default: true }));
  };

  const onDoneClick = () => {
    history.push(ROUTES.MYACCOUNT);
  };

  if (isLoadingPage) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-20 md:py-24 px-4">
      <PaymentMethods
        title="Payment Methods"
        subtitle="Select your default payment method"
        submitBtnText="Done"
        selectedPaymentMethod={selectedPaymentMethod}
        availablePaymentMethods={availablePaymentMethods}
        onSelectCard={updatePaymentMethodAsDefault}
        onSubmitBtn={onDoneClick}
        className="max-w-xl mx-auto"
      />
    </div>
  );
};

export default PaymentMethodsDefault;
