import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ROUTES from 'shared/constants/routes';
import { SIGNUP_STATE_CREATED, SIGNUP_STATE_PERSONAL_DETAILS } from 'screens/onboarding/constants';
import { genderSelectOptions, zipcodeRegExp } from 'shared/utils/helpers';
import { editProfileInit } from 'screens/my-account/actionCreators';
import { validateRangeAndSubmit, closeOutsideRangeModal } from 'screens/locations/actionCreators';
import {
  getNearestLocation,
  showOutsideRangeModalSelector,
  outsideRangeValidationLoadingSelector,
} from 'screens/locations/reducer';
import { getUserProfile, getEditProfileLoading } from 'screens/my-account/reducer';
import {
  OnboardingLayoutContent,
  OnboardingLayoutSidebar,
} from 'shared/components/layout/OnboardingLayout';
import InputPasswordField from 'shared/components/InputPasswordField';
import InputTextField from 'shared/components/InputTextField';
import InputSelectField from 'shared/components/InputSelectField';
import InputDateField from 'shared/components/InputDateField';
import AvatarUploader from 'shared/components/AvatarUploader';
import Button from 'shared/components/Button';
import avatarPlaceholderImg from 'screens/onboarding/images/avatar-placeholder.jpeg';
import OutsideRangeModal from 'screens/onboarding/components/OutsideRangeModal';

const OPTIONS = {
  disableSuccessToast: true,
  redirectTo: ROUTES.ONBOARDING_INTENSITY_LEVEL,
};

const PersonalDetailsForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUserProfile);
  const editProfileLoading = useSelector(getEditProfileLoading);
  const outsideRangeLoading = useSelector(outsideRangeValidationLoadingSelector);
  const nearestLocation = useSelector(getNearestLocation);
  const showOutsideRangeModal = useSelector(showOutsideRangeModalSelector);

  const signupStateIsCreated = currentUser.signupState === SIGNUP_STATE_CREATED;

  const loading = editProfileLoading || outsideRangeLoading;

  const buildParams = (values) => {
    const { birthdayYear, birthdayMonth, birthdayDay, ...rest } = values;
    const birthday = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);

    return {
      ...rest,
      ...(signupStateIsCreated ? { signupState: SIGNUP_STATE_PERSONAL_DETAILS } : {}),
      birthday,
    };
  };

  const checkZipcode = (values) => {
    dispatch(validateRangeAndSubmit(buildParams(values), OPTIONS));
  };

  const updateUser = (values) => {
    dispatch(editProfileInit(buildParams(values), OPTIONS));
  };

  const onContinue = (values) => {
    dispatch(closeOutsideRangeModal());
    updateUser(values);
  };

  const initialValues = {
    password: '',
    passwordConfirmation: '',
    image: '',
    gender: currentUser.gender || '',
    birthdayDay: currentUser?.birthday ? new Date(currentUser.birthday).getUTCDate() : '',
    birthdayMonth: currentUser?.birthday ? new Date(currentUser.birthday).getUTCMonth() + 1 : '',
    birthdayYear: currentUser?.birthday ? new Date(currentUser.birthday).getUTCFullYear() : '',
    zipcode: currentUser.zipcode || '',
  };

  const validationSchema = Yup.object().shape({
    password: signupStateIsCreated ? Yup.string().required('Required') : null,
    passwordConfirmation: signupStateIsCreated ? Yup.string().required('Required') : null,
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
      onSubmit={checkZipcode}
      enableReinitialize
    >
      {({ values }) => (
        <Form className="flex">
          <OnboardingLayoutContent>
            <h1 className="font-shapiro95_super_wide text-xl md:text-2xl mb-4">
              Choose a password
            </h1>
            <div className="mb-6">
              <InputPasswordField
                name="password"
                label="Password*"
                allowShowPassword
                className="mb-4"
                autoComplete="new-password"
              />
              <InputPasswordField
                name="passwordConfirmation"
                autoComplete="new-password"
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
              <Button type="submit" loading={loading}>
                Next
              </Button>
            </div>
          </OnboardingLayoutContent>
          <OnboardingLayoutSidebar>
            <Button type="submit" loading={loading} className="w-full">
              Next
            </Button>
          </OnboardingLayoutSidebar>
          <OutsideRangeModal
            isOpen={showOutsideRangeModal}
            closeHandler={() => dispatch(closeOutsideRangeModal())}
            location={nearestLocation}
            onContinue={() => onContinue(values)}
          />
        </Form>
      )}
    </Formik>
  );
};

PersonalDetailsForm.propTypes = {};

export default PersonalDetailsForm;
