import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import InputRadioField from 'shared/components/InputRadioField';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Button from 'shared/components/Button';
import Collapsible from 'shared/components/Collapsible';
import Badge from 'shared/components/Badge';

export const OpenClubGoalsModal = ({
  isOpen,
  closeHandler,
  onConfirm,
  openClubGoal,
  setOpenClubGoal,
  shootingMachines,
  setShootingMachineId,
}) => {
  const handleSelect = (value) => {
    setOpenClubGoal(value);
    setShootingMachineId(null);
  };

  const handleShootingMachineSelect = (newShootingMachineId) => {
    setShootingMachineId(newShootingMachineId);
  };

  const openClubGoals = {
    RUN_PICKUP: 'Run Pickup',
    SHOOT_SOLO: 'Shoot Around Solo',
    HANG_OUT: 'Hang out',
  };

  return (
    <Modal
      closeHandler={closeHandler}
      isOpen={isOpen}
      title="What is your goal for this open club?"
    >
      <div>
        <InputRadioField
          name="goal"
          checked={openClubGoal === openClubGoals.RUN_PICKUP}
          onChange={() => handleSelect(openClubGoals.RUN_PICKUP)}
          variant="cc-ball"
          className="mb-2"
          formik={false}
        >
          Run pickup
        </InputRadioField>
        <InputRadioField
          name="goal"
          checked={openClubGoal === openClubGoals.SHOOT_SOLO}
          onChange={() => handleSelect(openClubGoals.SHOOT_SOLO)}
          variant="cc-ball"
          className="mb-2"
          formik={false}
        >
          Shoot around solo
        </InputRadioField>
        <InputRadioField
          name="goal"
          checked={openClubGoal === openClubGoals.HANG_OUT}
          onChange={() => handleSelect(openClubGoals.HANG_OUT)}
          variant="cc-ball"
          className="mb-4"
          formik={false}
        >
          Hang out
        </InputRadioField>
        {shootingMachines.length > 0 && (
          <Collapsible text="Rent shooting machine" inverse className="mb-8">
            <div className="sm:pl-5">
              <ul>
                {shootingMachines.map(
                  ({ id, reserved, price, startTime, endTime, inputChecked }) => (
                    <li key={id} className="flex items-center">
                      <InputCheckboxField
                        name="goal"
                        checked={inputChecked}
                        variant="cc-ball"
                        onChange={() => handleShootingMachineSelect(id)}
                        disabled={reserved}
                        formik={false}
                        className="mb-2"
                      >
                        <div className="flex -mt-1">
                          <span className="block text-xs sm:text-sm w-20 sm:w-24">{startTime}</span>
                          -
                          <span className="block text-xs sm:text-sm w-20 sm:w-24 text-right">
                            {endTime}
                          </span>
                        </div>
                      </InputCheckboxField>
                      <span className="font-shapiro95_super_wide text-lg ml-4 -mt-1">${price}</span>
                      {reserved && (
                        <Badge size="sm" className="ml-2 -mt-2">
                          Reserved
                        </Badge>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </Collapsible>
        )}
        <div className="text-center">
          <Button type="submit" onClick={() => onConfirm()} disabled={!openClubGoal}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

OpenClubGoalsModal.defaultProps = {
  openClubGoal: null,
};

OpenClubGoalsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  openClubGoal: PropTypes.string,
  setOpenClubGoal: PropTypes.func.isRequired,
  shootingMachines: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setShootingMachineId: PropTypes.func.isRequired,
};

export default OpenClubGoalsModal;
