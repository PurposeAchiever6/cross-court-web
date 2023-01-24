import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';

const MembershipPurchaseConfirmationModal = ({ isOpen, closeHandler, onConfirm }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Membership Purchase" size="sm">
      <div className="mb-8">
        I understand I am purchasing a monthly subscription that will auto charge me on a monthly
        basis unless my membership is paused or canceled.
        <InputCheckboxField
          name="termsAccepted"
          onChange={() => setTermsAccepted(!termsAccepted)}
          value={termsAccepted}
          formik={false}
          className="mt-4"
        >
          I agree to the{' '}
          <Link className="hover:underline" to={ROUTES.TERMS}>
            terms of service
          </Link>
        </InputCheckboxField>
      </div>
      <div className="text-center">
        <PrimaryButton onClick={onConfirm} disabled={!termsAccepted}>
          Confirm
        </PrimaryButton>
      </div>
    </Modal>
  );
};

MembershipPurchaseConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MembershipPurchaseConfirmationModal;
