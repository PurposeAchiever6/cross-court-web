import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
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
          const { errors } = props;
          return (
            <Form className="flex flex-col">
              <InputTextField
                labelText="First Name"
                error={errors.firstName}
                name="firstName"
                placeholder="John"
              />
              <InputTextField
                labelText="Last Name"
                error={errors.lastName}
                name="lastName"
                placeholder="Doe"
              />
              <InputPhoneField
                labelText="Phone"
                error={errors.phoneNumber}
                name="phoneNumber"
                placeholder="(123) 123-4567"
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
