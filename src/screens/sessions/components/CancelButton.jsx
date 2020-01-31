import React from 'react';
import { not } from 'ramda';

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

export default CancelButton;
