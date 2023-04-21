import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Button from 'shared/components/Button';

export const ScoutingModal = ({ isOpen, closeHandler, scouting, setScouting, onConfirm }) => {
  const [submiting, setSubmiting] = useState(false);

  const onConfirmHandler = () => {
    setSubmiting(true);
    onConfirm();
  };

  return (
    <Modal title="Wants Evauation?" isOpen={isOpen} closeHandler={closeHandler}>
      <div>
        <p className="text-sm mb-4">
          Our Experience Team will go through our player evaluation form with you to provide a
          rating after evaluating your performance and hustle during a live session.
        </p>
        <div className="flex justify-center">
          <InputCheckboxField
            name="scouting"
            value={scouting}
            onChange={() => setScouting(!scouting)}
            variant="cc-ball"
            className="font-shapiro95_super_wide uppercase mb-8"
            formik={false}
          >
            Use Evaluation Credit
          </InputCheckboxField>
        </div>
        <div className="text-center">
          <Button onClick={onConfirmHandler} loading={submiting}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ScoutingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  scouting: PropTypes.bool.isRequired,
  setScouting: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ScoutingModal;
