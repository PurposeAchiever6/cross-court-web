import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelSubscription } from 'screens/products/actionCreators';
import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const CancelMembershipModal = ({ isOpen, closeHandler, subscription }) => {
  const dispatch = useDispatch();

  const [showCancelMsg, setShowCancelMsg] = useState(false);

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription(subscription));
    setShowCancelMsg(true);
  };

  const onClose = () => {
    setShowCancelMsg(false);
    closeHandler();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={onClose}
      title={
        showCancelMsg ? 'Membership Canceled' : 'Are you sure you want to cancel your membership?'
      }
      size={showCancelMsg ? 'lg' : 'xl'}
    >
      {showCancelMsg ? (
        <div className="text-center">
          <div className="mb-8">
            <div className="mb-2">We&apos;ll miss you on the CCTeam.</div>
            <div>Hope you come back soon!</div>
          </div>
          <PrimaryButton fontSize="0.75rem" onClick={onClose}>
            Done
          </PrimaryButton>
        </div>
      ) : (
        <div>
          <div className="text-sm mb-8">
            <p className="mb-5">
              You are about to cancel your membership. The credits in your account will remain
              available until the end of the billing period. At that point, your card on file will
              no longer be charged.
            </p>
            <p>Your membership can be reactivated at any point prior to end of billing period.</p>
          </div>
          <div className="text-center">
            <PrimaryButton onClick={cancelSubscriptionHandler}>YES</PrimaryButton>
          </div>
        </div>
      )}
    </Modal>
  );
};

CancelMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  subscription: PropTypes.shape().isRequired,
};

export default CancelMembershipModal;
