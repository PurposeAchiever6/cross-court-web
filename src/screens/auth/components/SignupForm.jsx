import { Formik, Form } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import device from 'shared/styles/mediaQueries';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { phoneRegExp, zipcodeRegExp } from 'shared/utils/helpers';

const SignupFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  margin: 5rem 0;

  .forgot-pass {
    font-weight: 600;
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 1rem;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .login {
    text-align: center;
    margin: 3rem 0;

    span {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      text-align: center;
    }
  }

  @media (max-width: 991px) {
    margin-top: 1rem;

    form {
      width: 100%;
    }
  }
`;

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
    .transform(value => value.replace(/\D/g, ''))
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('Required'),
  confirmPhoneNumber: Yup.string()
    .transform(value => value.replace(/\D/g, ''))
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
  <SignupFormContainer className="signup">
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={values => {
        signupHandler({ ...values });
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="form">
          <h1>SIGN UP</h1>
          <div className="form-group">
            <InputTextField labelText="First Name*" error={errors.firstName} name="firstName" />
          </div>
          <div className="form-group">
            <InputTextField labelText="Last Name*" error={errors.lastName} name="lastName" />
          </div>
          <div className="form-group">
            <InputPhoneField
              labelText="Phone Number*"
              error={errors.phoneNumber}
              name="phoneNumber"
            />
          </div>
          <div className="form-group">
            <InputPhoneField
              labelText="Confirm Phone Number*"
              error={errors.confirmPhoneNumber}
              name="confirmPhoneNumber"
            />
          </div>
          <div className="form-group">
            <InputTextField labelText="Zip Code*" error={errors.zipcode} name="zipcode" />
          </div>
          <div className="form-group">
            <InputTextField labelText="Email*" error={errors.email} name="email" />
          </div>
          <div className="form-group">
            <InputTextField
              labelText="Password*"
              error={errors.password}
              name="password"
              type="password"
            />
          </div>
          <div className="form-group">
            <InputTextField
              labelText="Confirm Password*"
              error={errors.password}
              name="confirmPassword"
              type="password"
            />
          </div>
          <div className="form-group">
            <InputCheckboxField name="terms">
              I agree to the <Link to={ROUTES.TERMS}>terms and conditions</Link>
            </InputCheckboxField>
          </div>
          <Button type="submit" disabled={isLoading} className="ar-button">
            <div className="ar-button-inner">{!isLoading ? 'SIGN UP' : <Spinner />}</div>
          </Button>

          <div className="login">
            <span>
              Already have an account?
              <Link to={ROUTES.LOGIN}>
                <strong>&nbsp;Log in</strong>
              </Link>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  </SignupFormContainer>
);

SignupForm.propTypes = {
  errors: PropTypes.object,
  signupHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignupForm;
