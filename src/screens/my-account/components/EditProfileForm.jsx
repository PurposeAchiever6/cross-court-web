import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputFileField from 'shared/components/InputFileField';
import { formatPhoneNumber, phoneRegExp } from 'shared/utils/helpers';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

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
    .matches(phoneRegExp, "That doesn't look like a phone number")
    .required('Required'),
});

const EditProfileForm = ({ editProfileAction, editProfileLoading, profile }) => {
  const initialValues = {
    firstName: profile ? profile.firstName : '',
    lastName: profile ? profile.lastName : '',
    phoneNumber: profile ? formatPhoneNumber(profile.phoneNumber) : '',
    instagramUsername: profile ? profile.instagramUsername : '',
  };

  return (
    <EditProfileFormContainer>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => {
          editProfileAction(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { errors, setFieldValue } = props;
          return (
            <Form className="flex flex-col">
              <InputFileField
                labelText="Profile Image"
                name="image"
                setFieldValue={setFieldValue}
                accept="image/*"
              />
              <InputTextField
                name="instagramUsername"
                label="Instagram"
                error={errors.instagramUsername}
                className="mb-6"
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
                className="mb-8"
              />
              <div className="flex justify-end">
                <PrimaryButton type="submit" loading={editProfileLoading}>
                  SAVE
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
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
