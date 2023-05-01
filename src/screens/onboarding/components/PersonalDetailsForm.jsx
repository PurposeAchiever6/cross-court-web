import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ROUTES from 'shared/constants/routes';
import { genderSelectOptions, zipcodeRegExp, phoneRegExp } from 'shared/utils/helpers';
import { editProfileInit } from 'screens/my-account/actionCreators';
import { getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';
import {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import InputPasswordField from 'shared/components/InputPasswordField';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import InputSelectField from 'shared/components/InputSelectField';
import InputDateField from 'shared/components/InputDateField';
import AvatarUploader from 'shared/components/AvatarUploader';
import Button from 'shared/components/Button';
import avatarPlaceholderImg from 'screens/onboarding/images/avatar-placeholder.jpeg';

const SIGNUP_STATE_CREATED = 'created';
const SIGNUP_STATE_PERSONAL_DETAILS = 'personal_details';

const PersonalDetailsForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUserProfile);
  const loadingBtn = useSelector(getEditProfileLoading);

  const signupStateIsCreated = currentUser.signupState === SIGNUP_STATE_CREATED;

  const updateUser = (values) => {
    const { birthdayYear, birthdayMonth, birthdayDay, ...rest } = values;
    const birthday = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);

    dispatch(
      editProfileInit(
        {
          ...rest,
          ...(signupStateIsCreated ? { signupState: SIGNUP_STATE_PERSONAL_DETAILS } : {}),
          birthday,
        },
        {
          disableSuccessToast: true,
          redirectTo: ROUTES.MYACCOUNT,
        }
      )
    );
  };

  const initialValues = {
    password: '',
    passwordConfirmation: '',
    image: '',
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    phoneNumber: currentUser.phoneNumber || '',
    gender: currentUser.gender || '',
    birthdayDay: currentUser?.birthday ? new Date(currentUser.birthday).getUTCDate() : '',
    birthdayMonth: currentUser?.birthday ? new Date(currentUser.birthday).getUTCMonth() + 1 : '',
    birthdayYear: currentUser?.birthday ? new Date(currentUser.birthday).getUTCFullYear() : '',
    zipcode: currentUser.zipcode || '',
  };

  const validationSchema = Yup.object().shape({
    password: signupStateIsCreated ? Yup.string().required('Required') : null,
    passwordConfirmation: signupStateIsCreated ? Yup.string().required('Required') : null,
    image: currentUser.imageUrl ? null : Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .transform((value) => value.replace(/\D/g, ''))
      .matches(phoneRegExp, 'Please enter a valid phone number')
      .required('Required'),
    gender: Yup.string().required('Required'),
    birthdayDay: Yup.number().required('Required'),
    birthdayMonth: Yup.number().required('Required'),
    birthdayYear: Yup.number().required('Required'),
    zipcode: Yup.string()
      .matches(zipcodeRegExp, 'Please enter a valid zip code')
      .required('Required'),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={updateUser}
    >
      <Form className="flex">
        <OnboardingLayoutContent className="w-full">
          <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">Choose a password</h1>
          <div className="mb-6">
            <InputPasswordField
              name="password"
              label="Password*"
              allowShowPassword
              className="mb-4"
            />
            <InputPasswordField
              name="passwordConfirmation"
              label="Confirm Password*"
              allowShowPassword
            />
          </div>
          <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">
            Tell us more about yourself
          </h1>
          <div>
            <AvatarUploader
              name="image"
              img={currentUser.imageUrl}
              placeholderImg={avatarPlaceholderImg}
              description="Please upload a high-resolution, recent profile picture featuring a professional,
                close-range photo of you."
              className="mb-4"
            />
            <InputTextField label="First Name*" name="firstName" className="mb-4" />
            <InputTextField label="Last Name*" name="lastName" className="mb-4" />
            <InputPhoneField label="Phone*" name="phoneNumber" showFlag={false} className="mb-4" />
            <InputSelectField
              label="Gender*"
              name="gender"
              options={genderSelectOptions}
              className="mb-4"
            />
            <InputDateField name="birthday" label="Date of Birth" className="mb-4" />
            <InputTextField label="Zip Code*" name="zipcode" maxLength="5" />
          </div>
          <div className="hidden md:block text-right mt-6">
            <Button type="submit" loading={loadingBtn}>
              Next
            </Button>
          </div>
        </OnboardingLayoutContent>
        <OnboardingLayoutSidebar className="w-1/4 shrink-0">
          <Button type="submit" loading={loadingBtn} className="w-full">
            Next
          </Button>
        </OnboardingLayoutSidebar>
      </Form>
    </Formik>
  );
};

PersonalDetailsForm.propTypes = {};

export default PersonalDetailsForm;
