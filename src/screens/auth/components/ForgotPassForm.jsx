import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';
import { string, func, bool } from 'prop-types';

import ROUTES from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';

const ForgotPassFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  flex-direction: column;
  margin-top: 5rem;

  .forgot-pass {
    font-weight: 600;
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 20rem;
  }

  p {
    width: 64%;
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin-bottom: 3rem;

    @media ${device.desktop} {
      text-align: center;
    }
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

  .cancel {
    margin-top: 3rem;
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

  @media ${device.mobile} {
    form {
      width: 100%;
    }

    p {
      width: 100%;
      font-size: 1.1rem;
    }
  }
`;

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
});

const ForgotPassForm = ({ error, forgotPassHandler, isLoading }) => (
  <ForgotPassFormContainer>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={values => {
        forgotPassHandler({ ...values });
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <h1>Forgot your Password?</h1>
          <p>Enter your email and we will send you a link to reset your password</p>
          <Form className="form">
            <div className="form-group">
              <InputTextField labelText="Email" name="email" placeholder="example@crosscourt.com" />
            </div>
            {!isEmpty(error) && <div className="error-container"> {error}</div>}
            <Button type="submit" disabled={isLoading}>
              {!isLoading ? 'Reset Password' : <Spinner />}
            </Button>
            <span className="cancel">
              <Link to={ROUTES.LOGIN}>
                <strong>Cancel</strong>
              </Link>
            </span>
          </Form>
        </>
      )}
    </Formik>
  </ForgotPassFormContainer>
);

ForgotPassForm.propTypes = {
  error: string,
  forgotPassHandler: func.isRequired,
  isLoading: bool.isRequired,
};

export default ForgotPassForm;
