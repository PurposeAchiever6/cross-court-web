import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { initialLoadInit, editProfileInit } from 'screens/my-account/actionCreators';
import { getPageLoading, getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';

import HeaderAction from 'shared/components/HeaderAction';
import InputTextareaField from 'shared/components/InputTextareaField';
import PersonSvg from 'shared/components/svg/PersonSvg';
import Loading from 'shared/components/Loading';

const MAX_LENGTH = 250;

const validationSchema = Yup.object().shape({
  bio: Yup.string().required('Required').max(MAX_LENGTH),
});

const Bio = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPageLoading);
  const profile = useSelector(getUserProfile);
  const editProfileLoading = useSelector(getEditProfileLoading);
  const history = useHistory();

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const editProfileAction = (values) => dispatch(editProfileInit(values));

  const { bio } = profile;

  const initialValues = {
    bio: bio || '',
  };

  if (isLoading || isEmpty(profile)) {
    return <Loading />;
  }

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => editProfileAction(values)}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => (
        <>
          <HeaderAction
            confirmText="Save"
            onConfirm={submitForm}
            confirmLoading={editProfileLoading}
            cancelText="Cancel"
            onCancel={() => history.goBack()}
          />
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row mb-12">
              <div className="flex items-center justify-center md:w-1/4 mb-6 md:mb-0">
                <PersonSvg className="w-32" />
              </div>
              <InputTextareaField
                name="bio"
                label="Bio*"
                labelColor="white"
                placeholder="Enter some info about yourself"
                dark
                showCharCount
                maxLength={MAX_LENGTH}
                variant="expanded"
                className="md:w-3/4"
              />
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

Bio.propTypes = {};

export default Bio;
