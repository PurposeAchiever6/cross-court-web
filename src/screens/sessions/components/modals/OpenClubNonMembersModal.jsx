import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';

export const OpenClubNonMembersModal = ({ isOpen, closeHandler }) => (
  <Modal title="Please Note" isOpen={isOpen} closeHandler={closeHandler} dark>
    <div>
      <p className="text-white">
        Must be a current member to book Open Club. Members with a paused subscription will not be
        able to book Open Club.
      </p>
    </div>
  </Modal>
);

OpenClubNonMembersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default OpenClubNonMembersModal;
