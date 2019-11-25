import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';
import device from 'shared/styles/mediaQueries';

const PasswordResetFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  flex-direction: column;
  margin-top: 5rem;

  h1 {
    width: 60%;
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 3.5rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  a {
    font-weight: 600;
    text-align: center;
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

  .login {
    margin: 3rem;
  }

  @media ${device.mobile} {
    form {
      width: 100%;
    }

    h1 {
      width: 100%;
      font-size: 1.5rem;
      text-align: left;
    }
  }
`;

const initialValues = {
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  passwordConfirm: Yup.string().required('Required'),
});

const PasswordResetForm = ({ error, passResetHandler, isLoading }) => {
  return (
    <PasswordResetFormContainer>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={values => {
          passResetHandler({ ...values });
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <>
            <h1>Please Enter your New Password</h1>
            <Form className="form">
              <div className="form-group">
                <InputTextField
                  type="password"
                  labelText="Password"
                  name="password"
                  placeholder="Min. 8 characters long"
                />
              </div>
              <div className="form-group">
                <InputTextField
                  type="password"
                  labelText="Confirm Password"
                  name="passwordConfirm"
                  placeholder="Confirm password"
                />
              </div>
              {!isEmpty(error) && <div className="error-container">{error}</div>}
              <Button type="submit" disabled={isLoading}>
                {!isLoading ? 'Set New Password' : <Spinner />}
              </Button>
              <Link to={routes.login} className="login">
                Back to Log in
              </Link>
            </Form>
          </>
        )}
      </Formik>
    </PasswordResetFormContainer>
  );
};

PasswordResetForm.propTypes = {
  error: PropTypes.string,
  passResetHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PasswordResetForm;
