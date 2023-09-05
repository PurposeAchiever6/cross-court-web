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

const SignupForm = ({ dark, submitText, className }) => {
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
            autoComplete="email"
            dark={dark}
            labelColor={dark ? 'white' : null}
            leftIcon
            icon={<EnvelopeSvg className="w-5" />}
            className="mb-6"
          />
          <div className="flex mb-4 gap-4">
            <InputTextField
              label="First Name*"
              name="firstName"
              dark={dark}
              labelColor={dark ? 'white' : null}
              className="w-full"
            />
            <InputTextField
              label="Last Name*"
              name="lastName"
              dark={dark}
              labelColor={dark ? 'white' : null}
              className="w-full"
            />
          </div>
          <InputPhoneField
            label="Phone*"
            name="phoneNumber"
            dark={dark}
            labelColor={dark ? 'white' : null}
            showFlag={false}
            className="mb-4"
          />
          <Button type="submit" loading={isLoading}>
            {submitText}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

SignupForm.defaultProps = {
  dark: false,
  submitText: 'Join',
  className: '',
};

SignupForm.propTypes = {
  dark: PropTypes.bool,
  submitText: PropTypes.string,
  className: PropTypes.string,
};

export default SignupForm;
