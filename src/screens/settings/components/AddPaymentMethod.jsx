import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { addCard } from 'screens/payment-methods/actionCreators';
import { getAddCardLoading } from 'screens/payment-methods/reducer';
import PaymentMethodForm from 'shared/components/PaymentMethodForm';

const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const addCardLoading = useSelector(getAddCardLoading);

  const redirectTo = location.state?.redirectTo ?? ROUTES.BILLING;

  const addCardHandler = (stripe, cardElement) => {
    dispatch(addCard(stripe, cardElement, redirectTo));
  };

  return (
    <PaymentMethodForm
      variant="expanded"
      onSubmit={addCardHandler}
      submitLoading={addCardLoading}
      dark
    />
  );
};

export default AddPaymentMethod;
