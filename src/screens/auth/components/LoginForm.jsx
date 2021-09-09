import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';
import { string, func, bool } from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const LoginFormContainer = styled.div`
  width: 23rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;

  @media (max-width: 991px) {
    width: 80%;
  }

  form {
    width: 100%;
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  button {
    margin-top: 1rem;
    margin-bottom: 3rem;
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

  .signup {
    margin-top: 2rem;
  }

  .forgot-pass {
    font-weight: 600;
    margin-bottom: 3rem;
  }

  .error-container {
    display: flex;
    justify-content: center;
    padding: 0.25rem 1.5rem;
    margin: 0.5rem 0;
    background: ${colors.errorRed};
    color: ${colors.white};
    border-radius: 4px;
    font-size: 0.8rem;
  }

  @media (max-width: 991px) {
    margin-top: 1rem;
    form {
      width: 100%;
    }
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = ({ error, loginHandler, isLoading }) => (
  <LoginFormContainer className="login">
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        loginHandler({ ...values });
      }}
      validationSchema={validationSchema}
      className="form"
    >
      {(props) => {
        const { errors } = props;
        return (
          <Form className="form">
            <h1>LOG IN</h1>
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
            <PrimaryButton type="submit" loading={isLoading} w="100%">
              LOG IN
            </PrimaryButton>
            <span className="forgot-pass">
              <Link to={ROUTES.FORGOTPASSWORD}>Forgot your password?</Link>
            </span>
            <span className="signup">
              If you are a new player
              <Link to={ROUTES.SIGNUP}>
                <strong>Sign up here</strong>
              </Link>
            </span>
          </Form>
        );
      }}
    </Formik>
  </LoginFormContainer>
);

LoginForm.propTypes = {
  error: string,
  loginHandler: func.isRequired,
  isLoading: bool.isRequired,
};

export default LoginForm;
