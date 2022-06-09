import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { confirmOutsideOfSkillLevelSession } from 'shared/utils/outsideOfSkillLevel';

const OutsideOfSkillLevelModal = ({ isOpen, closeHandler, onConfirm, level, userProfile }) => {
  const handleClick = () => {
    confirmOutsideOfSkillLevelSession(userProfile);
    onConfirm();
  };

  const closeAndConfirm = () => {
    confirmOutsideOfSkillLevelSession(userProfile);
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeAndConfirm} title={`${level} session`} size="sm">
      <div className="mb-8">{`This session is for ${level.toLowerCase()} players.`}</div>
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
  level: PropTypes.string.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default OutsideOfSkillLevelModal;
