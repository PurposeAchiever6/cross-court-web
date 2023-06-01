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
import { industriesSelectOptions, SELECT_OTHER_VALUE } from 'screens/my-account/utils';

const MAX_LENGTH = 250;

const validationSchema = Yup.object().shape({
  bio: Yup.string().required('Required').max(MAX_LENGTH),
  workCompany: Yup.string()
    .required('Required')
    .min(3, 'Should be at least 3 characters')
    .max(20, 'Should be at most 20 characters'),
  workIndustry: Yup.string().required('Required'),
  otherWorkIndustry: Yup.string().when('workIndustry', {
    is: (workIndustry) => workIndustry === SELECT_OTHER_VALUE,
    then: (schema) =>
      schema
        .required('Required')
        .min(4, 'Should be at least 4 characters')
        .max(25, 'Should be at most 25 characters'),
    otherwise: null,
  }),
  workOccupation: Yup.string()
    .required('Required')
    .min(5, 'Should be at least 5 characters')
    .max(30, 'Should be at most 30 characters'),
});

const Bio = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoading = useSelector(getPageLoading);
  const profile = useSelector(getUserProfile);
  const editProfileLoading = useSelector(getEditProfileLoading);

  const { bio, workCompany, workIndustry, workOccupation } = profile;

  const otherIndustrySelected =
    workIndustry &&
    industriesSelectOptions().filter((option) => option.value === workIndustry).length === 0;

  const initialValues = {
    bio: bio || '',
    workCompany: workCompany || '',
    workIndustry: otherIndustrySelected ? SELECT_OTHER_VALUE : workIndustry || '',
    otherWorkIndustry: otherIndustrySelected ? workIndustry : '',
    workOccupation: workOccupation || '',
  };

  const editProfile = (values) => {
    const { workIndustry, otherWorkIndustry } = values;

    dispatch(
      editProfileInit({
        ...values,
        workIndustry: workIndustry === SELECT_OTHER_VALUE ? otherWorkIndustry : workIndustry,
      })
    );
  };

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading || isEmpty(profile)) {
    return <Loading />;
  }

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={editProfile}
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
              label="Company name*"
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
            {values.workIndustry === SELECT_OTHER_VALUE && (
              <InputTextField
                name="otherWorkIndustry"
                dark
                className="-mt-2 mb-4 md:w-3/4 md:self-end"
              />
            )}
            <InputTextField
              name="workOccupation"
              label="What do you do?*"
              labelColor="white"
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
