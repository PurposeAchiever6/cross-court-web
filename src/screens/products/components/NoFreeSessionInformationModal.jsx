import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const NoFreeSessionInformationModal = ({ isOpen, closeHandler }) => (
  <Modal title="Please Note" isOpen={isOpen} closeHandler={closeHandler}>
    <div>
      <div className="mb-8">
        <p className="mb-4">
          Due to your location, you are not eligible for a free trial session. If you wish to
          proceed, you can buy a credit session at a <strong>discounted price of $12</strong>.
        </p>
        <p>
          You can purchase this session credit later by going to the <strong>"Memberships"</strong>{' '}
          page.
        </p>
      </div>
      <div className="text-center">
        <PrimaryButton onClick={closeHandler}>Done</PrimaryButton>
      </div>
    </div>
  </Modal>
);

NoFreeSessionInformationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default NoFreeSessionInformationModal;
