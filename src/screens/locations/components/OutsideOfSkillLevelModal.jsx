import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { confirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';

const OutsideOfSkillLevelModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const handleClick = () => {
    confirmOutsideOfSkillLevelSession(userProfile);
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Let's Sweat!" size="sm">
      <div className="mb-8">
        Please note that this session has a different skill level than yours.
      </div>
      <div className="text-center">
        <PrimaryButton inverted onClick={handleClick}>
          I UNDERSTAND
        </PrimaryButton>
      </div>
    </Modal>
  );
};

OutsideOfSkillLevelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default OutsideOfSkillLevelModal;
