import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'shared/components/Tabs';
import Modal from 'shared/components/Modal';
import CancelMembership from 'shared/components/EndMembershipModal/components/CancelMembership';
import PauseMembership from 'shared/components/EndMembershipModal/components/PauseMembership';
import FeedbackModal from 'shared/components/EndMembershipModal/components/FeedbackModal';

export const EndMembershipModal = ({ isOpen, closeHandler }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const openFeedbackModal = () => {
    closeHandler();
    setFeedbackModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeHandler={closeHandler} size="lg">
        <Tabs>
          <div label="Pause">
            <PauseMembership closeHandler={closeHandler} />
          </div>
          <div label="End Membership">
            <CancelMembership openFeedbackModal={openFeedbackModal} />
          </div>
        </Tabs>
      </Modal>
      <FeedbackModal isOpen={feedbackModalOpen} closeHandler={() => setFeedbackModalOpen(false)} />
    </>
  );
};

EndMembershipModal.defaultProps = {};

EndMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default EndMembershipModal;
