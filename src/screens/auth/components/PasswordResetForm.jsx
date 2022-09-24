import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'shared/constants/routes';
import InputTextField from 'shared/components/InputTextField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string().required('Required'),
});

const PasswordResetForm = ({ error, passResetHandler, isLoading }) => (
  <div>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        passResetHandler(values);
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <h1 className="font-shapiro95_super_wide text-center text-3xl uppercase mb-10">
            New Password
          </h1>
          <Form>
            <InputTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Min. 8 characters long"
              className="mb-4"
            />
            <InputTextField
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              className="mb-6"
            />
            {!isEmpty(error) && <div className="alert-error mb-2">{error}</div>}
            <PrimaryButton type="submit" loading={isLoading} w="100%" className="mb-10">
              Set New Password
            </PrimaryButton>
            <div className="text-center">
              <Link to={ROUTES.LOGIN} className="font-bold hover:underline">
                Back to Log in
              </Link>
            </div>
          </Form>
        </>
      )}
    </Formik>
  </div>
);

PasswordResetForm.defaultProps = {
  error: null,
};

PasswordResetForm.propTypes = {
  error: PropTypes.string,
  passResetHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PasswordResetForm;
