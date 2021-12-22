import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { isUserInFirstFreeSessionFlow } from 'shared/utils/user';
import Loading from 'shared/components/Loading';
import FreeSessionConfirmModal from 'shared/components/FreeSessionConfirmModal';
import Modal from 'shared/components/Modal';
import { getSelectedProduct } from 'screens/products/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

import { getPageLoading, getAvailableCards } from './reducer';
import { initialLoadInit } from './actionCreators';
import PaymentMethods from './components/PaymentMethods';

const PaymentsPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const availableCards = useSelector(getAvailableCards);
  const selectedProduct = useSelector(getSelectedProduct);
  const userInfo = useSelector(getUserProfile);

  const isFSFFlow = isUserInFirstFreeSessionFlow(userInfo);
  const redirectUrl = window.localStorage.getItem('redirect');

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
