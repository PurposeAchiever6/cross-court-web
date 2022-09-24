import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit, setSelectedCard } from 'screens/payment-methods/actionCreators';
import {
  getPageLoading,
  getAvailableCards,
  getSelectedCard,
} from 'screens/payment-methods/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import Loading from 'shared/components/Loading';
import PaymentMethods from 'screens/payment-methods/components/PaymentMethods';
import FirstSessionFreeFlowModal from 'screens/payment-methods/components/FirstSessionFreeFlowModal';

const PaymentMethodsSelect = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoadingPage = useSelector(getPageLoading);
  const availablePaymentMethods = useSelector(getAvailableCards);
  const selectedPaymentMethod = useSelector(getSelectedCard);
  const userProfile = useSelector(getUserProfile);

  const redirectUrl = window.localStorage.getItem('redirect');
  const isFSFFlow = isUserInFirstFreeSessionFlow(userProfile);
  const shouldReturnFSFDetailsPage = isFSFFlow && availablePaymentMethods.length && redirectUrl;

  const [showFSFFModal, setShowFSFFModal] = useState(false);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  useEffect(() => {
    setShowFSFFModal(isFSFFlow && availablePaymentMethods.length === 0 && redirectUrl);
  }, [isFSFFlow, availablePaymentMethods, redirectUrl]);

  const selectPaymentMethod = (paymentMethod) => {
    dispatch(setSelectedCard(paymentMethod));
  };

  const onNextClick = () => {
    if (shouldReturnFSFDetailsPage) {
      window.localStorage.removeItem('redirect');
      history.push(redirectUrl);
    } else {
      history.push(ROUTES.CHECKOUT);
    }
  };

  if (isLoadingPage) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-20 md:py-24 px-4">
      <PaymentMethods
        title="Choose a Payment Method"
        submitBtnText="Next"
        selectedPaymentMethod={selectedPaymentMethod}
        availablePaymentMethods={availablePaymentMethods}
        onSelectCard={selectPaymentMethod}
        onSubmitBtn={onNextClick}
        className="max-w-xl mx-auto"
      />
      <FirstSessionFreeFlowModal
        isOpen={showFSFFModal}
        closeHandler={() => setShowFSFFModal(false)}
      />
    </div>
  );
};

export default PaymentMethodsSelect;
