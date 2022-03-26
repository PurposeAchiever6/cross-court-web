import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const StepCanceledContent = ({ closeModal }) => (
  <div className="text-center">
    <div className="mb-8">
      <div className="mb-2">We&apos;ll miss you on the CCTeam.</div>
      <div>Hope you come back soon!</div>
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
