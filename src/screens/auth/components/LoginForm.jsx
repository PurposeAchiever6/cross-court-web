import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import { loginInit } from 'screens/auth/actionCreators';
import { getLoginLoading } from 'screens/auth/reducer';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import InputTextField from 'shared/components/InputTextField';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';
import PasswordSvg from 'shared/components/svg/PasswordSvg';

const LoginForm = ({ className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getLoginLoading);
  const loginUser = (credentials) => dispatch(loginInit(credentials));

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
        {() => (
          <Form>
            <div className="mb-8">
              <InputTextField
                name="email"
                label="Email Address"
                icon={<EnvelopeSvg className="w-5" />}
                leftIcon
                className="mb-4"
              />
              <InputTextField
                name="password"
                type="password"
                label="Password"
                icon={<PasswordSvg className="w-5" />}
                leftIcon
              />
            </div>
            <div className="flex justify-between items-center">
              <Link variant="purple-dark" to={ROUTES.FORGOTPASSWORD} className="text-sm">
                Forgot Password
              </Link>
              <Button type="submit" loading={isLoading}>
                Log In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.defaultProps = {
  className: '',
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
