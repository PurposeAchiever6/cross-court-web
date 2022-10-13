import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputFileField from 'shared/components/InputFileField';
import InputSelectField from 'shared/components/InputSelectField';
import InputDateField from 'shared/components/InputDateField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { genderSelectOptions, formatPhoneNumber, phoneRegExp } from 'shared/utils/helpers';

const EditProfileFormContainer = styled.div`
  label {
    margin-bottom: 0.5rem;
    font-family: shapiro95_super_wide;
    color: black;
    font-weight: 400;
    letter-spacing: 0;
  }
`;

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

const EditProfileForm = ({ editProfileAction, editProfileLoading, profile }) => {
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
    <EditProfileFormContainer>
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
            <InputFileField
              labelText="Profile Image"
              name="image"
              setFieldValue={setFieldValue}
              accept="image/*"
            />
            <InputTextField
              name="firstName"
              label="First Name"
              placeholder="John"
              error={errors.firstName}
              className="mb-6"
            />
            <InputTextField
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName}
              className="mb-6"
            />
            <InputPhoneField
              name="phoneNumber"
              label="Phone"
              placeholder="(123) 123-4567"
              error={errors.phoneNumber}
              className="mb-6"
            />
            <InputDateField
              name="birthday"
              label="Date of Birth"
              error={errors.birthday}
              className="mb-6"
            />
            <InputSelectField
              name="gender"
              label="Gender"
              error={errors.gender}
              options={genderSelectOptions}
              className="mb-6"
            />
            <InputTextField
              name="instagramUsername"
              label="Instagram"
              error={errors.instagramUsername}
              className="mb-8"
            />
            <div className="flex justify-end">
              <PrimaryButton type="submit" loading={editProfileLoading}>
                SAVE
              </PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </EditProfileFormContainer>
  );
};

EditProfileForm.propTypes = {
  editProfileAction: PropTypes.func.isRequired,
  editProfileLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
};

export default EditProfileForm;
