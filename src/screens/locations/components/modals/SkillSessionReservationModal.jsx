import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import { confirmSkillSession } from 'shared/utils/skillSessionsConfirmations';
import VideoPlayer from 'shared/components/VideoPlayer';
import { getIsAuthenticated } from 'screens/auth/reducer';

const SkillSessionReservationModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  const [dontShowModalAgain, setDontShowModalAgain] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);

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
          <p className="mb-4">Please notice you are booking a SKLZ session.</p>
          <Link onClick={() => setWatchVideo(true)}>See video</Link>
          {isAuthenticated && (
            <InputCheckboxField
              name="confirmSkillSessionReservation"
              onChange={() => setDontShowModalAgain(!dontShowModalAgain)}
              value={dontShowModalAgain}
              formik={false}
              className="mt-4"
            >
              Don't show me this again
            </InputCheckboxField>
          )}
        </div>
        <div className="text-center">
          <Button onClick={handleClick}>I understand</Button>
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
