import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { string, func, bool } from 'prop-types';

import ROUTES from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
});

const ForgotPassForm = ({ error, forgotPassHandler, isLoading }) => (
  <div>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        forgotPassHandler(values);
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <h1 className="font-shapiro95_super_wide text-3xl text-center uppercase mb-10">
            Forgot Your Password?
          </h1>
          <p className="text-center mb-10">
            Enter your email and we will send you a link to reset your password.
          </p>
          <Form>
            <InputTextField
              label="Email"
              name="email"
              placeholder="example@crosscourt.com"
              className="mb-4"
            />
            {error && <div className="alert-error mb-2">{error}</div>}
            <PrimaryButton type="submit" loading={isLoading} w="100%" className="mb-10">
              Reset Password
            </PrimaryButton>
            <div className="text-center">
              <Link to={ROUTES.LOGIN} className="font-bold hover:underline">
                Cancel
              </Link>
            </div>
          </Form>
        </>
      )}
    </Formik>
  </div>
);

ForgotPassForm.defaultProps = {
  error: null,
};

ForgotPassForm.propTypes = {
  error: string,
  forgotPassHandler: func.isRequired,
  isLoading: bool.isRequired,
};

export default ForgotPassForm;
