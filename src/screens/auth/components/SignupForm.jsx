import { Formik, Form } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import device from 'shared/styles/mediaQueries';
import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';

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

  button {
    width: 20rem;
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

  @media ${device.mobile} {
    margin-top: 1rem;

    form {
      width: 100%;
    }
  }
`;

const initialValues = {
  name: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  phoneNumber: Yup.number().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const SignupForm = ({ signupHandler, isLoading, errors }) => (
  <SignupFormContainer>
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
          <h1>Sign up</h1>
          <div className="form-group">
            <InputTextField labelText="Name" error={errors.username} name="name" />
          </div>
          <div className="form-group">
            <InputTextField labelText="Phone" error={errors.phoneNumber} name="phoneNumber" />
          </div>
          <div className="form-group">
            <InputTextField labelText="email" error={errors.email} name="email" />
          </div>
          <div className="form-group">
            <InputTextField
              labelText="Password"
              error={errors.password}
              name="password"
              type="password"
            />
          </div>
          <div className="form-group">
            <InputTextField
              labelText="Confirm Password"
              error={errors.password}
              name="confirmPassword"
              type="password"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {!isLoading ? 'Sign Up' : <Spinner />}
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
