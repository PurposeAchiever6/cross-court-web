import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { createSessionSurvey } from 'screens/surveys/sessions/actionCreators';
import Modal from 'shared/components/Modal';
import StarsRate from 'shared/components/StarsRate';
import InputTextareaField from 'shared/components/InputTextareaField';
import Button from 'shared/components/Button';
import { formatSessionTime, longMonthAndDate } from 'shared/utils/date';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';

const SessionSurveyModal = ({ showSurveyModal, setShowSurveyModal, userSessionInfo }) => {
  const dispatch = useDispatch();
  const session = userSessionInfo?.session ?? {};
  const location = session?.location ?? {};

  const submitHandler = (values) => {
    dispatch(
      createSessionSurvey({ rate: values.experienceRate, feedback: values.experienceFeedback })
    );
    setShowSurveyModal(false);
  };

  const initialValues = {
    experienceFeedback: '',
    experienceRate: 0,
  };

  const validationSchema = Yup.object().shape({
    experienceRate: Yup.number().required('Required').min(1, 'Required'),
    experienceFeedback: Yup.string().when('experienceRate', {
      is: (experienceRate) => experienceRate < 4,
      then: Yup.string().required('Required').min(20, 'Please include at least 20 characters'),
      otherwise: Yup.string().notRequired().nullable(),
    }),
  });

  return (
    <Modal
      isOpen={showSurveyModal}
      closeHandler={() => setShowSurveyModal(false)}
      closeOnOverlayClick={false}
      size="md"
      showCloseButton={false}
      shouldCloseOnEsc={false}
      title="How was your recent experience?"
    >
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ values, setFieldValue, errors }) => {
          const disabled =
            !values.experienceRate > 4 || (values.experienceRate < 4 && !values.experienceFeedback);

          return (
            <Form>
              <p className="before:w-[0.75em] before:h-[0.75em] before:mr-1 before:bg-cc-purple before:inline-block before:flex-shrink-0 mb-4">
                <span className="font-shapiro95_super_wide">Session</span>: {location.name},{' '}
                {longMonthAndDate(userSessionInfo.date)} @ {formatSessionTime(session.time)}
              </p>
              <LineDashedSvg />
              <StarsRate
                size="md"
                rate={values.experienceRate}
                onClick={(rate) => setFieldValue('experienceRate', rate)}
                showEmptyStars
                className="my-4"
                error={errors.experienceRate}
              />
              <p className="mb-2 text-sm">Share your thoughts</p>
              <InputTextareaField
                name="experienceFeedback"
                label="Comments"
                rows={3}
                className="mb-2"
              />
              <LineDashedSvg className="my-4" />
              <Button type="submit" disabled={disabled}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

SessionSurveyModal.defaultProps = {
  userSessionInfo: {},
};

SessionSurveyModal.propTypes = {
  showSurveyModal: PropTypes.bool.isRequired,
  setShowSurveyModal: PropTypes.func.isRequired,
  userSessionInfo: PropTypes.shape(),
};

export default SessionSurveyModal;
