import React from 'react';
import PropTypes from 'prop-types';

import AlternativeButton from 'shared/components/AlternativeButton';

const CancelButton = ({ modalToggler }) => (
  <AlternativeButton className="cancel-btn" onClick={modalToggler}>
    Cancel Reservation
  </AlternativeButton>
);

CancelButton.propTypes = {
  modalToggler: PropTypes.func.isRequired,
};

export default CancelButton;
