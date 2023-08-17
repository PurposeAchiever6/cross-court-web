import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { getUtmParams } from 'shared/utils/utm';
import { emailRegExp, phoneRegExp } from 'shared/utils/helpers';
import { signUpInit } from 'screens/auth/actionCreators';
import { getSignupLoading } from 'screens/auth/reducer';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputTextField from 'shared/components/InputTextField';
import Button from 'shared/components/Button';
import EnvelopeSvg from 'shared/components/svg/EnvelopeSvg';

const SignupForm = ({ className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getSignupLoading);

  const signup = (credentials) => {
    const utmParams = getUtmParams();

    dispatch(signUpInit({ ...credentials, ...utmParams }));
  };

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegExp, 'Please enter a valid email').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .transform((value) => value.replace(/\D/g, ''))
      .matches(phoneRegExp, 'Please enter a valid phone number')
      .required('Required'),
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
            autoComplete="email"
          />
          <div className="flex mb-4 gap-4">
            <InputTextField label="First Name*" name="firstName" className="w-full" />
            <InputTextField label="Last Name*" name="lastName" className="w-full" />
          </div>
          <InputPhoneField label="Phone*" name="phoneNumber" showFlag={false} className="mb-4" />
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
