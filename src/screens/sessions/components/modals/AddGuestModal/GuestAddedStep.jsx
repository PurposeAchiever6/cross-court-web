import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const GuestAddedStep = ({ onDone }) => (
  <div className="text-center">
    <p className="mb-3">
      Your guest will receive a text message confirming their invite to join you.
    </p>
    <p className="mb-3">
      The message will include an <strong>access code</strong> that will need to be presented to one
      of our Experience Manager's upon arrival.
    </p>
    <p className="mb-6">
      Guests can be added/removed through the session details page found in "My Account".
    </p>
    <PrimaryButton onClick={onDone}>Done</PrimaryButton>
  </div>
);

GuestAddedStep.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default GuestAddedStep;
