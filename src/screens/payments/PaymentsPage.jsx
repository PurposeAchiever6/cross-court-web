import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from 'shared/components/Loading';
import { isNil } from 'ramda';
import { getSelectedProduct } from 'screens/products/reducer';
import { initialLoadInit } from './actionCreators';
import { getPageLoading, getAvailableCards } from './reducer';
import PaymentMethods from './components/PaymentMethods';

import Modal from 'shared/components/Modal';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';
import { getIsAuthenticated } from 'screens/auth/reducer';

import { getUserProfile } from 'screens/my-account/reducer';
import ROUTES from 'shared/constants/routes';

const PaymentsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const availableCards = useSelector(getAvailableCards);
  const selectedProduct = useSelector(getSelectedProduct);
  const isAuthenticated = useSelector(getIsAuthenticated);

  /* START FSF FLOW LOGIC */
  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const isFSFFlow = isAuthenticated && freeSessionNotExpired && freeSessionNotClaimed;
  const redirectUrl = window.localStorage.getItem('redirect');
  /* END FSF FLOW LOGIC */

  const shouldShowFSFModal = () => !!(isFSFFlow && !availableCards.length && redirectUrl);
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const hideConfirmModalHandler = () => setShowConfirmModal(false);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isNil(selectedProduct) && !isFSFFlow) {
    return <Redirect to={ROUTES.MEMBERSHIPS} />;
  }

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
      <PaymentMethods availableCards={availableCards} />
    </div>
  );
};

export default PaymentsPage;
