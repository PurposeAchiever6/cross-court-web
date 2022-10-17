import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'shared/components/Modal';
import { getSessionInfo, getAddSessionGuestError } from 'screens/sessions/reducer';
import { useParams } from 'react-router-dom';
import { sessionData } from 'screens/sessions/utils';
import { addSessionGuest } from 'screens/sessions/actionCreators';

import GuestAddedStep from './GuestAddedStep';
import AddGuestStep from './AddGuestStep';

export const ADD_GUEST_STEP = 'add_guest_step';
export const GUEST_ADDED_STEP = 'guest_added_step';

const AddGuestModal = ({ userSessionId, showAddGuestModal, setShowAddGuestModal }) => {
  const [guestName, setGuestName] = useState('');
  const [step, setStep] = useState(ADD_GUEST_STEP);
  const { date } = useParams();
  const sessionInfo = useSelector(getSessionInfo);
  const error = useSelector(getAddSessionGuestError);
  const dispatch = useDispatch();

  const sessionInformation = sessionData(date, sessionInfo);

  const onClose = () => {
    setShowAddGuestModal(false);
    setStep(ADD_GUEST_STEP);
  };

  useEffect(() => {
    if (error) {
      onClose();
    }
  }, [error]);

  const onGuestAdded = (values) => {
    dispatch(addSessionGuest(userSessionId, values));
    setGuestName(`${values.firstName} ${values.lastName}`);
    setStep(GUEST_ADDED_STEP);
  };

  const modalData = (() => {
    switch (step) {
      case GUEST_ADDED_STEP:
        return {
          title: 'Success!',
          subtitle: `${guestName} added to session!`,
          size: 'xl',
          content: <GuestAddedStep />,
        };
      default:
        return {
          title: 'Add guest to session',
          size: 'xl',
          content: (
            <AddGuestStep sessionInformation={sessionInformation} onGuestAdded={onGuestAdded} />
          ),
        };
    }
  })();

  return (
    <Modal
      isOpen={showAddGuestModal}
      closeHandler={onClose}
      title={modalData.title}
      size={modalData.size}
      subtitle={modalData.subtitle}
    >
      {modalData.content}
    </Modal>
  );
};

AddGuestModal.propTypes = {
  userSessionId: PropTypes.number,
  showAddGuestModal: PropTypes.bool.isRequired,
  setShowAddGuestModal: PropTypes.func.isRequired,
};

export default AddGuestModal;
