import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import { initialLoadInit, editProfileInit } from 'screens/my-account/actionCreators';
import { getPageLoading, getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';

import Loader from 'screens/settings/components/Loader';
import Button from 'shared/components/Button';
import missingProfileImg from 'shared/images/missing-profile-image.jpg';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputDateField from 'shared/components/InputDateField';
import InputSelectField from 'shared/components/InputSelectField';
import InputFileField from 'shared/components/InputFileField';
import { genderSelectOptions, formatPhoneNumber, phoneRegExp } from 'shared/utils/helpers';

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

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isLoading || isEmpty(profile)) {
    return <Loader />;
  }

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
  };

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
      {({ errors, setFieldValue }) => (
        <Form className="flex flex-col">
          <div className="flex flex-col md:flex-row mb-12">
            <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">Photo</span>
            <div className="flex items-center bg-cc-blue-500 p-4 md:w-3/4">
              <img
                alt="profile-pic"
                src={imageUrl || missingProfileImg}
                className="border border-white border-opacity-40 rounded-full object-fit w-24 h-24 md:w-48 md:h-48 mr-6"
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
                error={errors.firstName}
                dark
                variant="expanded"
                className="mb-6"
              />
              <InputTextField
                label="Last Name"
                labelColor="white"
                name="lastName"
                placeholder="Doe"
                error={errors.lastName}
                dark
                variant="expanded"
                className="mb-6"
              />
              <InputPhoneField
                label="Phone"
                labelColor="white"
                name="phoneNumber"
                placeholder="(123) 123-4567"
                error={errors.phoneNumber}
                dark
                variant="expanded"
                className="mb-6"
              />
              <InputDateField
                name="birthday"
                label="Date of Birth"
                labelColor="white"
                error={errors.birthday}
                dark
                variant="expanded"
                className="mb-6"
              />
              <InputSelectField
                name="gender"
                label="Gender"
                labelColor="white"
                error={errors.gender}
                options={genderSelectOptions}
                dark
                variant="expanded"
                className="mb-6"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-12">
            <span className="text-2xl font-shapiro95_super_wide md:w-1/4 mb-6 md:mb-0">Links</span>
            <div className="flex flex-col md:w-3/4">
              <InputTextField
                name="instagramUsername"
                placeholder="@johndoe"
                error={errors.instagramUsername}
                dark
                variant="expanded"
                className="mb-6"
                leftIcon
                icon={<FontAwesomeIcon icon={faInstagram} size="xl" />}
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

Account.propTypes = {};

export default Account;
