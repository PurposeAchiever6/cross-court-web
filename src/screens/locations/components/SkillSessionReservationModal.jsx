import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { confirmSkillSession } from 'shared/utils/skillSessionsConfirmations';

const SkillSessionReservationModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const [dontShowModalAgain, setDontShowModalAgain] = useState(false);

  const handleClick = () => {
    if (dontShowModalAgain) {
      confirmSkillSession(userProfile);
    }

    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="SKLZ Session" size="sm">
      <div className="mb-8">
        <p className="mb-5">Please notice you are booking a SKLZ session.</p>
        <InputCheckboxField
          name="confirmSkillSessionReservation"
          onChange={() => setDontShowModalAgain(!dontShowModalAgain)}
          value={dontShowModalAgain}
          formik={false}
        >
          Don't show me this again
        </InputCheckboxField>
      </div>
      <div className="text-center">
        <PrimaryButton inverted onClick={handleClick}>
          I understand
        </PrimaryButton>
      </div>
    </Modal>
  );
};

SkillSessionReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default SkillSessionReservationModal;
