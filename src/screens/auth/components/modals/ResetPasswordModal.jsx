import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { passwordResetInit } from 'screens/auth/actionCreators';
import { getPassResetLoading } from 'screens/auth/reducer';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import InputTextField from 'shared/components/InputTextField';
import PasswordSvg from 'shared/components/svg/PasswordSvg';

export const ResetPasswordModal = ({ isOpen, closeHandler }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPassResetLoading);

  const resetPassword = (credentials) => dispatch(passwordResetInit(credentials));

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    passwordConfirmation: Yup.string().required('Required'),
  });

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} title="Choose New Password" size="lg">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={resetPassword}
        validationSchema={validationSchema}
      >
        <Form>
          <InputTextField
            name="password"
            label="New Password"
            type="password"
            icon={<PasswordSvg className="w-5" />}
            leftIcon
            className="mb-4"
          />
          <InputTextField
            name="passwordConfirmation"
            label="Verify New Password"
            type="password"
            icon={<PasswordSvg className="w-5" />}
            leftIcon
            className="mb-6"
          />
          <div className="text-right">
            <Button type="submit" loading={isLoading}>
              Confirm
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
