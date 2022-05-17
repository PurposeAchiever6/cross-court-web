import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'ramda';
import { string, func, bool } from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = ({ error, loginHandler, isLoading }) => (
  <div>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        loginHandler({ ...values });
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { errors } = props;
        return (
          <Form>
            <h1 className="font-shapiro95_super_wide text-center text-4xl uppercase mb-12">
              LOG IN
            </h1>
            <div className="mb-10">
              <InputTextField
                label="Email"
                error={errors.username}
                name="email"
                placeholder="example@crosscourt.com"
                className="text-lg mb-5"
              />
              <InputTextField
                type="password"
                label="Password"
                error={errors.password}
                name="password"
                placeholder="Type password"
                className="text-lg"
              />
            </div>
            {isEmpty(error) ? null : <div className="alert-error mb-2">{error}</div>}
            <PrimaryButton type="submit" loading={isLoading} w="100%" className="mb-14">
              LOG IN
            </PrimaryButton>
            <div className="text-center mb-14">
              <Link to={ROUTES.FORGOTPASSWORD} className="font-bold hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center">
              If you are a new player
              <Link to={ROUTES.SIGNUP} className="block font-bold hover:underline">
                Sign up here
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  </div>
);

LoginForm.defaultProps = {
  error: null,
};

LoginForm.propTypes = {
  error: string,
  loginHandler: func.isRequired,
  isLoading: bool.isRequired,
};

export default LoginForm;
