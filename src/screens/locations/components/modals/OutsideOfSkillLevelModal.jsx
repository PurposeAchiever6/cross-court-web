import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { confirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';

const OutsideOfSkillLevelModal = ({ isOpen, closeHandler, onConfirm, level, userProfile }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
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
        <p>This session is for {level.toLowerCase()} players.</p>
        {isAuthenticated && (
          <InputCheckboxField
            name="confirmOutsideSkillLevel"
            onChange={() => setDontShowModalAgain(!dontShowModalAgain)}
            value={dontShowModalAgain}
            formik={false}
            className="mt-5"
          >
            Don't show me this again
          </InputCheckboxField>
        )}
      </div>
      <div className="text-center">
        <Button onClick={handleClick}>I understand</Button>
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
