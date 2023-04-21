import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const NoFreeSessionInformationModal = ({ isOpen, closeHandler, price }) => (
  <Modal title="Please Note" isOpen={isOpen} closeHandler={closeHandler}>
    <div>
      <div className="mb-8">
        <p className="mb-4">
          Due to your location, you are not eligible for a free trial session. If you wish to
          proceed, you can buy a credit session at a{' '}
          <strong>discounted price of ${Number(price)}</strong>.
        </p>
        <p>
          You can purchase this session credit later by going to the <strong>"Memberships"</strong>{' '}
          page.
        </p>
      </div>
      <div className="text-center">
        <Button onClick={closeHandler}>Done</Button>
      </div>
    </div>
  </Modal>
);

NoFreeSessionInformationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  price: PropTypes.string,
};

export default NoFreeSessionInformationModal;
