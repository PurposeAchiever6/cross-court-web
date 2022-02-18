import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ROUTES from 'shared/constants/routes';

import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import Loading from 'shared/components/Loading';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';
import Modal from 'shared/components/Modal';
import { getUserProfile } from 'screens/my-account/reducer';

import { getPageLoading, getAvailableCards } from './reducer';
import { initialLoadInit } from './actionCreators';
import PaymentMethods from './components/PaymentMethods';

const PaymentsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoading = useSelector(getPageLoading);
  const availablePaymentMethods = useSelector(getAvailableCards);
  const userInfo = useSelector(getUserProfile);

  const isFSFFlow = isUserInFirstFreeSessionFlow(userInfo);
  const redirectUrl = window.localStorage.getItem('redirect');
  const isPaymentFlow = location.pathname === ROUTES.PAYMENT_METHODS;

  const shouldShowFSFModal = () => !!(isFSFFlow && !availablePaymentMethods.length && redirectUrl);
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {shouldShowFSFModal() && (
        <Modal shouldClose closeHandler={hideConfirmModalHandler} isOpen={showConfirmModal}>
          <FreeSessionConfirmModal
            closeHandler={hideConfirmModalHandler}
            isOpen={showConfirmModal}
          />
        </Modal>
      )}
      <PaymentMethods
        availablePaymentMethods={availablePaymentMethods}
        isPaymentFlow={isPaymentFlow}
      />
    </div>
  );
};

export default PaymentsPage;
