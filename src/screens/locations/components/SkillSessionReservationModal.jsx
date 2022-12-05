import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { confirmSkillSession } from 'shared/utils/skillSessionsConfirmations';
import VideoPlayer from 'shared/components/VideoPlayer';
import { getIsAuthenticated } from 'screens/auth/reducer';

const SkillSessionReservationModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const [dontShowModalAgain, setDontShowModalAgain] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleClick = () => {
    if (dontShowModalAgain) {
      confirmSkillSession(userProfile);
    }

    onConfirm();
  };

  return (
    <>
      <Modal isOpen={isOpen} closeHandler={closeHandler} title="SKLZ Session" size="sm">
        <div className="mb-8">
          <p>Please notice you are booking a SKLZ session.</p>
          <p
            onClick={() => setWatchVideo(true)}
            className="mt-2 mb-5 hover:underline cursor-pointer"
          >
            See video
          </p>
          {isAuthenticated && (
            <InputCheckboxField
              name="confirmSkillSessionReservation"
              onChange={() => setDontShowModalAgain(!dontShowModalAgain)}
              value={dontShowModalAgain}
              formik={false}
            >
              Don't show me this again
            </InputCheckboxField>
          )}
        </div>
        <div className="text-center">
          <PrimaryButton inverted onClick={handleClick}>
            I understand
          </PrimaryButton>
        </div>
      </Modal>
      <VideoPlayer
        url="/skill-sessions.mp4"
        playing
        openOnModal
        isModalOpen={watchVideo}
        closeModalHandler={() => {
          setWatchVideo(false);
        }}
      />
    </>
  );
};

SkillSessionReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default SkillSessionReservationModal;
