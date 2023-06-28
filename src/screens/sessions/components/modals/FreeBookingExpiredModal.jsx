import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const FreeBookingExpiredModal = ({ isOpen, closeHandler, session }) => {
  const { maxCapacity, spotsLeft, full } = session;

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} size="lg">
      <div>
        <div className="font-shapiro95_super_wide bg-cc-gray-400 p-3 mb-4 mt-3">
          <h2 className="text-xl">All complementary spots in this session have been booked.</h2>
          {maxCapacity !== null && (
            <div className="mt-3">Roster {`${maxCapacity - spotsLeft}/${maxCapacity}`}</div>
          )}
        </div>
        <p className="text-sm mb-4">
          {full
            ? 'This session is full. Join the waitlist for a chance to join.'
            : 'Use one of your existing credits to reserve a spot.'}
        </p>
        <Button onClick={closeHandler}>Close</Button>
      </div>
    </Modal>
  );
};

FreeBookingExpiredModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default FreeBookingExpiredModal;
