import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { phoneRegExp, zipcodeRegExp } from 'shared/utils/helpers';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import colors from 'shared/styles/constants';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  confirmPhoneNumber: '',
  zipcode: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .transform((value) => value.replace(/\D/g, ''))
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('Required'),
  confirmPhoneNumber: Yup.string()
    .transform((value) => value.replace(/\D/g, ''))
    .oneOf([Yup.ref('phoneNumber'), null], 'Phone numbers must match')
    .required('Required'),
  zipcode: Yup.string()
    .matches(zipcodeRegExp, 'Please enter a valid zip code')
    .required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  terms: Yup.bool().oneOf([true], 'Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const SignupForm = ({ signupHandler, isLoading, errors }) => (
  <div className="flex items-center justify-center my-20">
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        signupHandler({ ...values });
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="font-shapiro95_super_wide flex flex-col px-10 md:max-w-md">
          <h1 className="font-semibold text-3xl mb-10 text-center color-cc-black">SIGN UP</h1>
          <InputTextField
            labelColor={colors.brandBlack}
            labelText="First Name*"
            error={errors.firstName}
            name="firstName"
          />
          <InputTextField
            labelColor={colors.brandBlack}
            labelText="Last Name*"
            error={errors.lastName}
            name="lastName"
          />
          <InputPhoneField
            labelColor={colors.brandBlack}
            labelText="Phone Number*"
            error={errors.phoneNumber}
            name="phoneNumber"
          />
          <InputPhoneField
            labelColor={colors.brandBlack}
            labelText="Confirm Phone Number*"
            error={errors.confirmPhoneNumber}
            name="confirmPhoneNumber"
          />
          <InputTextField
            labelColor={colors.brandBlack}
            labelText="Zip Code*"
            error={errors.zipcode}
            name="zipcode"
          />
          <InputTextField
            labelColor={colors.brandBlack}
            labelText="Email*"
            error={errors.email}
            name="email"
          />
          <InputTextField
            labelColor={colors.brandBlack}
            labelText="Password*"
            error={errors.password}
            name="password"
            type="password"
          />

          <InputTextField
            labelColor={colors.brandBlack}
            labelText="Confirm Password*"
            error={errors.password}
            name="confirmPassword"
            type="password"
          />
          <InputCheckboxField name="terms" className="font-shapiro45_welter_extd">
            I agree to the{' '}
            <Link className="hover:underline" to={ROUTES.TERMS}>
              terms and conditions
            </Link>
          </InputCheckboxField>
          <PrimaryButton loading={isLoading} w="100%">
            NEXT
          </PrimaryButton>
          <div className="login font-shapiro45_welter_extd my-2">
            <span className="flex flex-col mt-2 text-center mt-4 cursor-pointer hover:underline">
              Already have an account?
              <Link to={ROUTES.LOGIN}>
                <strong>&nbsp;Log in</strong>
              </Link>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

SignupForm.propTypes = {
  errors: PropTypes.object,
  signupHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignupForm;
