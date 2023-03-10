import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import ROUTES from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import InputSelectField from 'shared/components/InputSelectField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { genderSelectOptions, phoneRegExp, zipcodeRegExp } from 'shared/utils/helpers';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  zipcode: '',
  gender: '',
  email: '',
  password: '',
  terms: false,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .transform((value) => value.replace(/\D/g, ''))
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('Required'),
  zipcode: Yup.string()
    .matches(zipcodeRegExp, 'Please enter a valid zip code')
    .required('Required'),
  gender: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  terms: Yup.bool().oneOf([true], 'Required'),
});

const SignupForm = ({ signupHandler, isLoading, errors }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex items-center justify-center my-20">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={(values) => {
          signupHandler(values);
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="font-shapiro95_super_wide flex flex-col px-10 md:max-w-md">
            <h1 className="font-semibold text-3xl mb-10 text-center color-cc-black">SIGN UP</h1>
            <InputTextField
              label="First Name*"
              error={errors?.firstName}
              name="firstName"
              className="mb-2 md:mb-5"
            />
            <InputTextField
              label="Last Name*"
              error={errors?.lastName}
              name="lastName"
              className="mb-2 md:mb-5"
            />
            <InputPhoneField
              label="Phone Number*"
              error={errors?.phoneNumber}
              name="phoneNumber"
              className="mb-2 md:mb-5"
            />
            <InputTextField
              label="Zip Code*"
              error={errors?.zipcode}
              name="zipcode"
              className="mb-2 md:mb-5"
            />
            <InputSelectField
              label="Gender*"
              error={errors?.gender}
              name="gender"
              options={genderSelectOptions}
              className="mb-2 md:mb-5"
            />
            <InputTextField
              label="Email*"
              error={errors?.email}
              name="email"
              className="mb-2 md:mb-5"
            />
            <InputTextField
              label="Password*"
              error={errors?.password}
              name="password"
              type={showPass ? 'text' : 'password'}
              className="mb-5 md:mb-8"
              rightIcon
              icon={
                <FontAwesomeIcon
                  className="cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                  icon={showPass ? faEye : faEyeSlash}
                />
              }
            />
            <InputCheckboxField name="terms" className="font-shapiro45_welter_extd mb-8">
              I agree to the
              <Link className="text-cc-purple hover:underline ml-2" to={ROUTES.TERMS}>
                terms and conditions
              </Link>
            </InputCheckboxField>
            <PrimaryButton loading={isLoading} w="100%" type="submit">
              SUBMIT
            </PrimaryButton>
            <div className="login font-shapiro45_welter_extd my-2">
              <span className="flex flex-col text-center mt-4 cursor-pointer hover:underline">
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
};

SignupForm.propTypes = {
  errors: PropTypes.object,
  signupHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignupForm;
