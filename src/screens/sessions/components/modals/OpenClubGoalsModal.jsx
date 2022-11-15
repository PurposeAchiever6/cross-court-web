import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Collapsible from 'shared/components/Collapsible';
import Badge from 'shared/components/Badge';

const SHOOTING_MACHINE_GOAL = 'SM';

export const OpenClubGoalsModal = ({
  isOpen,
  onConfirm,
  openClubGoal,
  setOpenClubGoal,
  shootingMachines,
  shootingMachineId,
  setShootingMachineId,
}) => {
  const handleSelect = (value) => {
    setOpenClubGoal(value);
    setShootingMachineId(null);
  };

  const handleShootingMachineSelect = (newShootingMachineId) => {
    setOpenClubGoal(SHOOTING_MACHINE_GOAL);
    setShootingMachineId(newShootingMachineId);
  };

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
          className="mb-4"
          formik={false}
        >
          Hang out
        </InputCheckboxField>
        {shootingMachines.length > 0 && (
          <Collapsible text="Rent shooting machine" inverse className="mb-8">
            <div className="sm:pl-5">
              <ul className="pl-0">
                {shootingMachines.map(({ id, reserved, price, startTime, endTime }) => (
                  <li key={id} className="flex items-center">
                    <InputCheckboxField
                      name={`shooting-machine-${id}`}
                      variant="cc-ball-white"
                      value={shootingMachineId === id}
                      onChange={() => handleShootingMachineSelect(id)}
                      disabled={reserved}
                      formik={false}
                      className="mb-1"
                    >
                      <span className="inline-block text-xs sm:text-sm w-20 sm:w-24">
                        {startTime}
                      </span>
                      -
                      <span className="inline-block text-xs sm:text-sm w-20 sm:w-24 text-right">
                        {endTime}
                      </span>
                    </InputCheckboxField>
                    <span className="font-shapiro95_super_wide text-lg ml-4 -mt-1">${price}</span>
                    {reserved && (
                      <Badge size="sm" className="ml-2 -mt-2">
                        Reserved
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Collapsible>
        )}
        <div className="text-center">
          <PrimaryButton type="submit" onClick={() => onConfirm()} disabled={!openClubGoal}>
            Done
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

OpenClubGoalsModal.defaultProps = {
  openClubGoal: null,
  shootingMachineId: null,
};

OpenClubGoalsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  openClubGoal: PropTypes.string,
  setOpenClubGoal: PropTypes.func.isRequired,
  shootingMachines: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  shootingMachineId: PropTypes.number,
  setShootingMachineId: PropTypes.func.isRequired,
};

export default OpenClubGoalsModal;
