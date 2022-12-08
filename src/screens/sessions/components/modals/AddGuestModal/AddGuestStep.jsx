import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
});

const AddGuestStep = ({ sessionInformation, onGuestAdded }) => (
  <div className="flex flex-col">
    <div className="flex justify-between -mx-1 mb-6">
      {sessionInformation.map((info, i) => (
        <div className="px-1" key={`modal-info-${i}`}>
          <p className="uppercase font-shapiro95_super_wide text-sm">{info.title}</p>
          <p className="uppercase font-shapiro45_welter_extd text-xs">{info.value}</p>
        </div>
      ))}
    </div>
    <p className="text-sm text-center mb-8">
      Easily invite a friend to the session above. Once you enter in your guest's contact
      information and click ADD, they will receive a text message with a code to show their Session
      Experience Manager upon arrival.
    </p>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={(values) => {
        onGuestAdded(values);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="sm:max-w-sm mx-auto">
          <InputTextField label="Guest First Name*" name="firstName" className="mb-3" />
          <InputTextField label="Guest Last Name*" name="lastName" className="mb-3" />
          <InputPhoneField label="Guest Phone Number*" name="phoneNumber" className="mb-3" />
          <InputTextField label="Guest Email*" name="email" className="mb-6" />
          <div className="text-center">
            <PrimaryButton loading={isSubmitting} type="submit">
              ADD
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

AddGuestStep.propTypes = {
  sessionInformation: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onGuestAdded: PropTypes.func.isRequired,
};

export default AddGuestStep;
