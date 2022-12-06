import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const CancelButton = ({ session, modalToggler }) => {
  const { scouting, shootingMachineReservation } = session.userSession;

  return (
    <div className="mb-4">
      <PrimaryButton onClick={modalToggler} inverted>
        CANCEL RESERVATION
      </PrimaryButton>
      {scouting && (
        <div className="text-sm mt-6">
          You have requested a <span className="font-semibold uppercase">evaluation</span> for this
          session
        </div>
      )}
      {shootingMachineReservation && (
        <div className="text-sm mt-6">
          You have reserved a shooting machine from{' '}
          <span className="font-semibold">{shootingMachineReservation.startTime}</span> to{' '}
          <span className="font-semibold">{shootingMachineReservation.endTime}</span>
        </div>
      )}
    </div>
  );
};

CancelButton.propTypes = {
  session: PropTypes.shape().isRequired,
  modalToggler: PropTypes.func.isRequired,
};

export default CancelButton;
