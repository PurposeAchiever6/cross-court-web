import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepCanceledContent = ({ closeModal }) => (
  <div className="text-center">
    <div className="mb-8">
      <p className="mb-2">
        Thank you. Your request has been submitted. The CCteam will be in touch within the next 24
        hours.
      </p>
    </div>
    <PrimaryButton fontSize="0.75rem" onClick={closeModal}>
      Done
    </PrimaryButton>
  </div>
);

StepCanceledContent.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default StepCanceledContent;
