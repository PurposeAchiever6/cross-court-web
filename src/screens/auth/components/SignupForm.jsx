import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { emailRegExp } from 'shared/utils/helpers';
import { getUserSource } from 'shared/utils/userSource';
import { signUpInit } from 'screens/auth/actionCreators';
import { getSignupLoading } from 'screens/auth/reducer';
import InputTextField from 'shared/components/InputTextField';
import Button from 'shared/components/Button';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';

const SignupForm = ({ className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getSignupLoading);

  const signup = (credentials) => {
    const source = getUserSource() || 'web';
    dispatch(signUpInit({ ...credentials, source }));
  };

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegExp, 'Please enter a valid email').required('Required'),
  });

  return (
    <div className={className}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={signup}
        validationSchema={validationSchema}
      >
        <Form>
          <InputTextField
            name="email"
            label="Email Address"
            icon={<EnvelopeSvg className="w-5" />}
            leftIcon
            className="mb-6"
          />
          <Button type="submit" loading={isLoading}>
            Join
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

SignupForm.defaultProps = {
  className: '',
};

SignupForm.propTypes = {
  className: PropTypes.string,
};

export default SignupForm;
