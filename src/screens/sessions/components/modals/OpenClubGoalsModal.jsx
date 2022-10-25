import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const CodeOfConductModal = ({ isOpen, onConfirm, openClubGoal, setOpenClubGoal }) => {
  const handleSelect = (value) => setOpenClubGoal(value);

  const openClubGoals = {
    RUN_PICKUP: 'Run Pickup',
    SHOOT_SOLO: 'Shoot Around Solo',
    HANG_OUT: 'Hang out',
  };

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      showCloseButton={false}
      title="What is your goal for this open club?"
      dark
    >
      <div className="text-white">
        <InputCheckboxField
          name="runPickup"
          value={openClubGoal === openClubGoals.RUN_PICKUP}
          onChange={() => handleSelect(openClubGoals.RUN_PICKUP)}
          variant="cc-ball-white"
          className="mb-2"
          formik={false}
        >
          Run pickup
        </InputCheckboxField>
        <InputCheckboxField
          name="shootSolo"
          value={openClubGoal === openClubGoals.SHOOT_SOLO}
          onChange={() => handleSelect(openClubGoals.SHOOT_SOLO)}
          variant="cc-ball-white"
          className="mb-2"
          formik={false}
        >
          Shoot around solo
        </InputCheckboxField>
        <InputCheckboxField
          name="hangOut"
          value={openClubGoal === openClubGoals.HANG_OUT}
          onChange={() => handleSelect(openClubGoals.HANG_OUT)}
          variant="cc-ball-white"
          className="mb-5"
          formik={false}
        >
          Hang out
        </InputCheckboxField>
        <div className="text-center">
          <PrimaryButton type="submit" onClick={() => onConfirm()} disabled={!openClubGoal}>
            Done
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

CodeOfConductModal.defaultProps = {
  openClubGoal: null,
};

CodeOfConductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  openClubGoal: PropTypes.string,
  setOpenClubGoal: PropTypes.func.isRequired,
};

export default CodeOfConductModal;
