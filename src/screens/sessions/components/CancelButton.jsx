import React from 'react';
import { not } from 'ramda';
import PropTypes from 'prop-types';

import AlternativeButton from 'shared/components/AlternativeButton';

const CancelButton = ({ modalToggler, session }) => (
  <AlternativeButton
    className="cancel-btn"
    onClick={modalToggler}
    disabled={not(session.userSession.inCancellationTime)}
  >
    Cancel Reservation
  </AlternativeButton>
);

CancelButton.propTypes = {
  modalToggler: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

export default CancelButton;
