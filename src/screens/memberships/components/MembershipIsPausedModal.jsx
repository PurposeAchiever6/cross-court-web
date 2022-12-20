import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import routes from 'shared/constants/routes';

const MembershipIsPausedModal = ({ isOpen, closeHandler }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} title="Your membership is paused" size="sm">
    <div className="mb-8">
      <p className="font-semibold">Please note:</p>
      <p className="mb-5">you are unable to book a session when your account is paused.</p>
      <p className="mb-5 font-semibold">To continue booking, please unpause your membership.</p>
      <p className="mb-5">Thanks.</p>
    </div>
    <div className="text-center">
      <PrimaryButton inverted type="submit" to={routes.MANAGE_MEMBERSHIP}>
        Manage my membership
      </PrimaryButton>
    </div>
  </Modal>
);

MembershipIsPausedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default MembershipIsPausedModal;
