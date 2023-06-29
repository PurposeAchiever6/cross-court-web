import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  loginInit,
  showForgotPasswordModal as showForgotPasswordModalAction,
  closeForgotPasswordModal as closeForgotPasswordModalAction,
} from 'screens/auth/actionCreators';
import { getLoginLoading, getShowForgotPasswordModal } from 'screens/auth/reducer';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import InputTextField from 'shared/components/InputTextField';
import InputPasswordField from 'shared/components/InputPasswordField';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';
import PasswordSvg from 'shared/components/svg/PasswordSvg';
import ForgotPasswordModal from 'screens/auth/components/modals/ForgotPasswordModal';

const LoginForm = ({ redirectTo, className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoginLoading);
  const showForgotPasswordModal = useSelector(getShowForgotPasswordModal);

  const loginUser = (credentials) => dispatch(loginInit(credentials, { redirectTo }));

  const setShowForgotPasswordModal = (show) => {
    show ? dispatch(showForgotPasswordModalAction()) : dispatch(closeForgotPasswordModalAction());
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className={className}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginUser}
      >
        <Form>
          <div className="mb-6">
            <InputTextField
              name="email"
              label="Email Address"
              icon={<EnvelopeSvg className="w-5" />}
              leftIcon
              className="mb-4"
            />
            <InputPasswordField
              name="password"
              label="Password"
              icon={<PasswordSvg className="w-5" />}
              leftIcon
            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit" loading={isLoading}>
              Log In
            </Button>
            <Link
              variant="purple-dark"
              onClick={() => setShowForgotPasswordModal(true)}
              className="text-sm"
            >
              Forgot Password
            </Link>
          </div>
        </Form>
      </Formik>
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        closeHandler={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
};

LoginForm.defaultProps = {
  redirectTo: null,
  className: '',
};

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
  className: PropTypes.string,
};

export default LoginForm;
