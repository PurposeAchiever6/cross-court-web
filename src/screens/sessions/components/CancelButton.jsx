import React from 'react';
import PropTypes from 'prop-types';

import AlternativeButton from 'shared/components/AlternativeButton';

const CancelButton = ({ modalToggler }) => (
  <AlternativeButton className="ar-button inverted double cancel-btn" onClick={modalToggler}>
    <div className="ar-button-inner">CANCEL RESERVATION</div>
    <div className="double-drop"></div>
  </AlternativeButton>
);

CancelButton.propTypes = {
  modalToggler: PropTypes.func.isRequired,
};

export default CancelButton;
