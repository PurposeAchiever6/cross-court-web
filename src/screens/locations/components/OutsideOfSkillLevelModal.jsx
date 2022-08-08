import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { confirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';

const OutsideOfSkillLevelModal = ({ isOpen, closeHandler, onConfirm, level, userProfile }) => {
  const [dontShowModalAgain, setDontShowModalAgain] = useState(false);

  const handleClick = () => {
    if (dontShowModalAgain) {
      confirmOutsideOfSkillLevelSession(userProfile);
    }

    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title={`${level} session`} size="sm">
      <div className="mb-8">
        <p className="mb-5">This session is for {level.toLowerCase()} players</p>
        <InputCheckboxField
          name="confirmOutsideSkillLevel"
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

OutsideOfSkillLevelModal.defaultProps = {
  level: '',
};

OutsideOfSkillLevelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
  level: PropTypes.string,
};

export default OutsideOfSkillLevelModal;
