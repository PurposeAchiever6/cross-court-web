import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  forgotPasswordInit,
  closeForgotPasswordEmailSentModal as closeForgotPasswordEmailSentModalAction,
} from 'screens/auth/actionCreators';
import {
  getForgotPasswordLoading,
  getShowForgotPasswordEmailSentModal,
} from 'screens/auth/reducer';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import InputTextField from 'shared/components/InputTextField';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';
import ForgotPasswordEmailSentModal from 'screens/auth/components/modals/ForgotPasswordEmailSentModal';

export const ForgotPasswordModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getForgotPasswordLoading);
  const showForgotPasswordEmailSentModal = useSelector(getShowForgotPasswordEmailSentModal);

  const [email, setEmail] = useState('');

  const disabledBtn = email.trim().length === 0;

  const forgotPassword = () => dispatch(forgotPasswordInit({ email }));

  const closeForgotPasswordEmailSentModal = () => {
    dispatch(closeForgotPasswordEmailSentModalAction());
  };

  const onClose = () => {
    setEmail('');
    closeHandler();
  };

  return (
    <>
      <Modal isOpen={isOpen} closeHandler={onClose} title="Forgot Password?" size="lg">
        <p className="text-sm mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <InputTextField
          name="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<EnvelopeSvg className="w-5" />}
          leftIcon
          formik={false}
          className="mb-8"
        />
        <div className="text-right">
          <Button onClick={forgotPassword} loading={isLoading} disabled={disabledBtn}>
            Reset Password
          </Button>
        </div>
      </Modal>
      <ForgotPasswordEmailSentModal
        isOpen={showForgotPasswordEmailSentModal}
        closeHandler={closeForgotPasswordEmailSentModal}
        email={email}
      />
    </>
  );
};

ForgotPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;
