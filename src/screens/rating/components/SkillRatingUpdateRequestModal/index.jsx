import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateProfileRequestInit } from 'screens/auth/actionCreators';

import ROUTES from 'shared/constants/routes';
import Modal from 'shared/components/Modal';
import StepProvideReasonContent from 'screens/rating/components/SkillRatingUpdateRequestModal/StepProvideReasonContent';
import StepSubmittedContent from 'screens/rating/components/SkillRatingUpdateRequestModal/StepSubmittedContent';

const STEP_PROVIDE_REASON = 1;
const STEP_SUBMITTED = 2;

const SkillRatingUpdateRequestModal = ({ isOpen, closeHandler, newSkillRating }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEP_PROVIDE_REASON);

  const submitRequest = ({ reason }) => {
    dispatch(updateProfileRequestInit({ skillRating: newSkillRating, reason }));
    setStep(STEP_SUBMITTED);
  };

  const goToMyAccount = () => {
    history.push(ROUTES.MYACCOUNT);
  };

  const modalData = (() => {
    switch (step) {
      case STEP_PROVIDE_REASON:
        return {
          title: 'Skill Rating Update',
          size: 'md',
          closeHandler,
          content: (
            <StepProvideReasonContent
              newSkillRating={newSkillRating}
              submitRequest={submitRequest}
            />
          ),
        };
      case STEP_SUBMITTED:
      default:
        return {
          title: 'Request Submitted',
          size: 'md',
          closeHandler: goToMyAccount,
          content: <StepSubmittedContent goToMyAccount={goToMyAccount} />,
        };
    }
  })();

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={modalData.closeHandler}
      title={modalData.title}
      size={modalData.size}
    >
      {modalData.content}
    </Modal>
  );
};

SkillRatingUpdateRequestModal.defaultProps = {
  newSkillRating: null,
};

SkillRatingUpdateRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  newSkillRating: PropTypes.string,
};

export default SkillRatingUpdateRequestModal;
