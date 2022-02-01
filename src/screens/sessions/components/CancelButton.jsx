import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const CancelButton = ({ modalToggler }) => (
  <PrimaryButton className="mb-4" onClick={modalToggler} inverted>
    CANCEL RESERVATION
  </PrimaryButton>
);

CancelButton.propTypes = {
  modalToggler: PropTypes.func.isRequired,
};

export default CancelButton;
