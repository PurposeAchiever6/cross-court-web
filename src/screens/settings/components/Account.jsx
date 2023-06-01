import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import { initialLoadInit, editProfileInit } from 'screens/my-account/actionCreators';
import { getPageLoading, getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';
import HeaderAction from 'shared/components/HeaderAction';
import missingProfileImg from 'shared/images/missing-profile-image.jpg';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputDateField from 'shared/components/InputDateField';
import InputSelectField from 'shared/components/InputSelectField';
import InputFileField from 'shared/components/InputFileField';
import Loading from 'shared/components/Loading';
import CrossSvg from 'shared/components/svg/CrossSvg';
import LinkSvg from 'shared/components/svg/LinkSvg';
import Button from 'shared/components/Button';
import {
  genderSelectOptions,
  formatPhoneNumber,
  phoneRegExp,
  urlRegExp,
} from 'shared/utils/helpers';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .transform((value) => value.replace(/\D/g, ''))
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .required('Required'),
  birthdayDay: Yup.number().required('Required'),
  birthdayMonth: Yup.number().required('Required'),
  birthdayYear: Yup.number().required('Required'),
  gender: Yup.string().required('Required').nullable(),
});

const Account = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPageLoading);
  const profile = useSelector(getUserProfile);
  const editProfileLoading = useSelector(getEditProfileLoading);
  const history = useHistory();

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  const editProfileAction = (values) => dispatch(editProfileInit(values));

  const { imageUrl } = profile;

  const initialValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phoneNumber: profile?.phoneNumber ? formatPhoneNumber(profile.phoneNumber) : '',
    instagramUsername: profile?.instagramUsername || '',
    gender: profile?.gender || '',
    birthdayDay: profile?.birthday ? new Date(profile.birthday).getUTCDate() : '',
    birthdayMonth: profile?.birthday ? new Date(profile.birthday).getUTCMonth() + 1 : '',
    birthdayYear: profile?.birthday ? new Date(profile.birthday).getUTCFullYear() : '',
    links: profile?.links || [],
    newLink: '',
  };

  const addNewLink = (formValues, setFieldValue, setFieldError) => {
    const { newLink, links } = formValues;

    if (!urlRegExp.test(newLink)) {
      setFieldError('newLink', 'Invalid link format');
      return;
    }

    setFieldValue('links', [...links, newLink]);
    setFieldValue('newLink', '');
    setFieldError('newLink', null);
  };

  const removeLink = (formValues, setFieldValue, linkToRemove) => {
    const { links } = formValues;
    setFieldValue(
      'links',
      links.filter((link) => link !== linkToRemove)
    );
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
      onSubmit={(values) => {
        const { birthdayYear, birthdayMonth, birthdayDay, ...rest } = values;
        const birthday = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);
        editProfileAction({ ...rest, birthday });
      }}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, setFieldError, submitForm }) => (
        <>
          <HeaderAction
            confirmText="Save"
            onConfirm={submitForm}
            confirmLoading={editProfileLoading}
            cancelText="Cancel"
            onCancel={() => history.push(ROUTES.MYACCOUNT)}
          />
          <Form className="flex flex-col">
            <div className="flex flex-col md:flex-row mb-12">
              <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">
                Photo
              </span>
              <div className="flex items-center bg-cc-blue-500 p-4 md:w-3/4">
                <img
                  alt="profile-pic"
                  src={imageUrl || missingProfileImg}
                  className="border border-white border-opacity-40 rounded-full object-cover w-24 h-24 md:w-48 md:h-48 mr-6"
                />
                <div>
                  {!imageUrl && (
                    <p className="mb-6 text-sm">
                      Please upload a high-resolution, recent profile picture featuring a
                      professional, close-range photo of you. Photos that do not meet this criteria
                      will not be approved.
                    </p>
                  )}
                  <InputFileField name="image" setFieldValue={setFieldValue} accept="image/*" />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-12">
              <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">
                Profile
              </span>
              <div className="flex flex-col md:w-3/4">
                <InputTextField
                  label="First Name"
                  labelColor="white"
                  name="firstName"
                  placeholder="John"
                  dark
                  variant="expanded"
                  className="mb-6"
                />
                <InputTextField
                  label="Last Name"
                  labelColor="white"
                  name="lastName"
                  placeholder="Doe"
                  dark
                  variant="expanded"
                  className="mb-6"
                />
                <InputPhoneField
                  label="Phone"
                  labelColor="white"
                  name="phoneNumber"
                  placeholder="(123) 123-4567"
                  dark
                  variant="expanded"
                  className="mb-6"
                />
                <InputDateField
                  name="birthday"
                  label="Date of Birth"
                  labelColor="white"
                  dark
                  variant="expanded"
                  className="mb-6"
                />
                <InputSelectField
                  name="gender"
                  label="Gender"
                  labelColor="white"
                  options={genderSelectOptions}
                  dark
                  variant="expanded"
                  className="mb-6"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-4">
              <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">
                Links
              </span>
              <div className="flex flex-col md:w-3/4">
                <InputTextField
                  name="instagramUsername"
                  label="Network Yourself"
                  labelColor="white"
                  placeholder="@johndoe"
                  dark
                  variant="expanded"
                  leftIcon
                  icon={<FontAwesomeIcon icon={faInstagram} size="xl" />}
                />
              </div>
            </div>
            {values.links.length > 0 && (
              <div className="md:w-3/4 md:self-end">
                {values.links.map((link, index) => (
                  <div className="relative">
                    <button
                      className="absolute text-white z-[100] top-7 right-4"
                      onClick={() => removeLink(values, setFieldValue, link)}
                      type="button"
                    >
                      <CrossSvg className="w-3" />
                    </button>
                    <InputTextField
                      key={`link-${index}`}
                      formik={false}
                      value={link}
                      readOnly
                      dark
                      variant="expanded"
                      name="newLink"
                      icon={<LinkSvg className="w-5" />}
                      leftIcon
                      className="mb-4"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="md:w-3/4 md:self-end">
              <InputTextField
                dark
                variant="expanded"
                name="newLink"
                icon={<LinkSvg className="w-5" />}
                leftIcon
                className="mb-4"
              />
              <Button
                variant="outline-white"
                disabled={values.newLink.length === 0}
                onClick={() => addNewLink(values, setFieldValue, setFieldError)}
              >
                Add
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

Account.propTypes = {};

export default Account;
