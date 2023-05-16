import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit, editProfileInit } from 'screens/my-account/actionCreators';
import { getPageLoading, getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';
import HeaderAction from 'shared/components/HeaderAction';
import InputTextareaField from 'shared/components/InputTextareaField';
import InputSelectField from 'shared/components/InputSelectField';
import InputTextField from 'shared/components/InputTextField';
import PersonSvg from 'shared/components/svg/PersonSvg';
import Loading from 'shared/components/Loading';
import { industriesSelectOptions, occupationsSelectOptions } from 'screens/my-account/utils';

const MAX_LENGTH = 250;

const validationSchema = Yup.object().shape({
  bio: Yup.string().required('Required').max(MAX_LENGTH),
  workCompany: Yup.string().required('Required'),
  workIndustry: Yup.string().required('Required'),
  workOccupation: Yup.string().required('Required'),
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

  const { bio, workCompany, workIndustry, workOccupation } = profile;

  const initialValues = {
    bio: bio || '',
    workCompany: workCompany || '',
    workIndustry: workIndustry || '',
    workOccupation: workOccupation || '',
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
      {({ values, submitForm }) => (
        <>
          <HeaderAction
            confirmText="Save"
            onConfirm={submitForm}
            confirmLoading={editProfileLoading}
            cancelText="Cancel"
            onCancel={() => history.push(ROUTES.MYACCOUNT)}
          />
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row mb-4">
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
            <InputTextField
              name="workCompany"
              label="Where do you work?*"
              labelColor="white"
              dark
              variant="expanded"
              className="mb-4 md:w-3/4 md:self-end"
            />
            <InputSelectField
              name="workIndustry"
              label="Industry*"
              labelColor="white"
              options={industriesSelectOptions()}
              dark
              variant="expanded"
              className="mb-4 md:w-3/4 md:self-end"
            />
            <InputSelectField
              disabled={!values.workIndustry}
              name="workOccupation"
              label="What do you do?*"
              labelColor="white"
              options={occupationsSelectOptions(values.workIndustry)}
              dark
              variant="expanded"
              className="md:w-3/4 md:self-end"
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

Bio.propTypes = {};

export default Bio;
