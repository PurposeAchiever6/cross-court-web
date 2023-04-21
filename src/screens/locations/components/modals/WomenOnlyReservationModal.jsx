import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { confirmWomenOnlySessions } from 'shared/utils/womenOnlySessionsConfirmations';

const WomenOnlyReservationModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dontShowModalAgain, setDontShowModalAgain] = useState(false);

  const handleClick = () => {
    if (dontShowModalAgain) {
      confirmWomenOnlySessions(userProfile);
    }

    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Women Session" size="sm">
      <div className="mb-8">
        <p>Please notice you are booking a women only session.</p>
        {isAuthenticated && (
          <InputCheckboxField
            name="confirmWomenOnly"
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

WomenOnlyReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default WomenOnlyReservationModal;
