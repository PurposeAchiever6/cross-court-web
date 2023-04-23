import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { emailRegExp, phoneRegExp } from 'shared/utils/helpers';
import { longSessionDate, hourRange } from 'shared/utils/date';
import { addSessionGuest } from 'screens/sessions/actionCreators';
import { getAddGuestLoading } from 'screens/sessions/reducer';
import Modal from 'shared/components/Modal';
import InputTextField from 'shared/components/InputTextField';
import InputPhoneField from 'shared/components/InputPhoneField';
import Button from 'shared/components/Button';

const AddGuestModal = ({ isOpen, closeHandler, session }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getAddGuestLoading);

  const { time, durationMinutes, userSession, location } = session;
  const { name, address, city, state, zipcode } = location;
  const { id: userSessionId, date } = userSession;

  const addGuestToSession = (guestData) => {
    dispatch(addSessionGuest(userSessionId, guestData));
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .transform((value) => value.replace(/\D/g, ''))
      .matches(phoneRegExp, 'Please enter a valid phone number')
      .required('Required'),
    email: Yup.string().matches(emailRegExp, 'Please enter a valid email').required('Required'),
  });

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
      title="Add a guest to your session"
      size="2xl"
    >
      <div>
        <p className="text-sm mb-5">
          Easily invite a friend to your session. Once you provide your guest's contact information
          and click Submit, they will receive a text message with a code to show to their Session
          Experience Manager upon arrival.
        </p>
        <div className="flex mb-10">
          <div className="w-full border border-black/70 border-r-0 p-3 sm:p-4">
            <div className="font-shapiro95_super_wide text-lg mb-1">When</div>
            <div className="text-xs sm:text-sm">
              <div>{longSessionDate(date)}</div>
              <div>{hourRange(time, durationMinutes)}</div>
            </div>
          </div>
          <div className="w-full border border-black/70 p-3 sm:p-4">
            <div className="font-shapiro95_super_wide text-lg mb-1">Where</div>
            <div className="text-xs sm:text-sm">
              <div>{`Crosscourt ${name}`}</div>
              <div>{address}</div>
              <div>{`${city}, ${state} ${zipcode}`}</div>
            </div>
          </div>
        </div>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addGuestToSession}
        >
          <Form>
            <InputTextField label="Guest First Name*" name="firstName" className="mb-4" />
            <InputTextField label="Guest Last Name*" name="lastName" className="mb-4" />
            <InputPhoneField label="Guest Phone*" name="phoneNumber" className="mb-4" />
            <InputTextField label="Guest Email*" name="email" className="mb-6" />
            <div className="text-right">
              <Button loading={isLoading} type="submit" className="w-full sm:w-auto">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

AddGuestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  session: PropTypes.shape().isRequired,
};

export default AddGuestModal;
