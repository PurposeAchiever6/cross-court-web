import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';

const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 2.5rem;
  .forgot-pass {
    font-weight: bold;
  }
  h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
  form {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  button[type='submit'] {
    background-color: #03449e;
    color: #fff;
    width: 100%;
    margin: 2rem 0;
  }
  a {
    color: #000;
  }
  span {
    font-size: 1rem;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
    strong {
      display: block;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .error-container {
    display: flex;
    justify-content: center;
    padding: 4px 20px;
    margin: 10px 0;
    background: #e84747;
    color: #fff;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  @media (max-width: 767px) {
    form {
      width: 100%;
    }
  }
`;

const LoginForm = ({ error, loginHandler, isLoading }) => {
  return (
    <LoginFormContainer>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          loginHandler({ ...values });
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
      >
        {props => {
          const { errors } = props;
          return (
            <Form className="form">
              <h1>Log in</h1>
              <div className="form-group">
                <InputTextField
                  labelText="Email"
                  error={errors.username}
                  name="email"
                  placeholder="example@crosscourt.com"
                />
              </div>
              <div className="form-group">
                <InputTextField
                  type="password"
                  labelText="Password"
                  error={errors.password}
                  name="password"
                  placeholder="Type password"
                />
              </div>
              {isEmpty(error) ? null : <div className="error-container">{error}</div>}
              <Button type="submit" disabled={isLoading}>
                {!isLoading ? 'Log in' : <Spinner />}
              </Button>
              <span className="forgot-pass">
                <Link to="/forgotpassword">Forgot your password?</Link>
              </span>
              <span>
                If you are a new costumer
                <Link to="/signup">
                  <strong>Sign up here</strong>
                </Link>
              </span>
            </Form>
          );
        }}
      </Formik>
    </LoginFormContainer>
  );
};

LoginForm.propTypes = {
  error: PropTypes.string,
  loginHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
