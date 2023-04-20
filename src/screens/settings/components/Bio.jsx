import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { initialLoadInit, editProfileInit } from 'screens/my-account/actionCreators';
import { getPageLoading, getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';

import Loader from 'screens/settings/components/Loader';
import Button from 'shared/components/Button';
import InputTextareaField from 'shared/components/InputTextareaField';
import PersonSvg from 'shared/components/svg/PersonSvg';

const validationSchema = Yup.object().shape({
  bio: Yup.string().required('Required'),
});

const Bio = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPageLoading);
  const profile = useSelector(getUserProfile);
  const editProfileLoading = useSelector(getEditProfileLoading);

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading || isEmpty(profile)) {
    return <Loader />;
  }

  const editProfileAction = (values) => dispatch(editProfileInit(values));

  const { bio } = profile;

  const initialValues = {
    bio: bio || '',
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => editProfileAction(values)}
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <Form className="flex flex-col">
          <div className="flex flex-col md:flex-row mb-12">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <PersonSvg className="w-32 m-auto" />
            </div>
            <div className="flex flex-col md:w-3/4">
              <InputTextareaField
                name="bio"
                label="Bio*"
                labelColor="white"
                placeholder="Enter some info about yourself"
                error={errors.bio}
                dark
                variant="expanded"
                className="mb-6"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" loading={editProfileLoading}>
              SAVE
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

Bio.propTypes = {};

export default Bio;
