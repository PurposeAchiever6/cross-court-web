import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ordinalSuffix } from 'shared/utils/helpers';
import { getRemoveSessionWaitlistLoading } from 'screens/sessions/reducer';
import roughLightBgImg from 'shared/images/backgrounds/rough-light.jpeg';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import ExclamationSvg from 'shared/components/svg/ExclamationSvg';
import Modal from 'shared/components/Modal';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';
import Button from 'shared/components/Button';

const WaitlistModal = ({ isOpen, closeHandler, waitlistPlacement, removeFromWaitlist }) => {
  const buttonLoading = useSelector(getRemoveSessionWaitlistLoading);

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
      title="You've been added to the waitlist"
      size="lg"
    >
      <LazyBackgroundImage
        img={roughLightBgImg}
        className="flex justify-center items-center pt-2 mb-6"
      >
        <span className="font-dharma_gothic_cexbold text-9xl leading-[7rem] mr-5">
          {waitlistPlacement}
        </span>
        <span className="text-lg">
          You are {ordinalSuffix(waitlistPlacement)} <br /> in line
        </span>
      </LazyBackgroundImage>
      <h4 className="font-shapiro95_super_wide flex items-center mb-2">
        <ExclamationSvg className="w-4 -mt-1 mr-2" />
        Important
      </h4>
      <div className="text-sm mb-6">
        <p className="mb-4">
          Please do not show up to Crosscourt unless you receive a message saying you have been
          added to the session roster from the waitlist.
        </p>
        <p className="mb-4">
          Our system will automatically add you to the session if someone in front of you cancels.
          Please look out for an SMS message confirming your addition to the session.
        </p>
        <p>Thank you</p>
      </div>
      <LineDashedSvg strokeWidth="3" strokeDashArray="6" className="mb-6" />
      <div className="text-center">
        <Button loading={buttonLoading} onClick={removeFromWaitlist}>
          Leave Waitlist
        </Button>
      </div>
    </Modal>
  );
};

WaitlistModal.defaultProps = {
  waitlistPlacement: null,
};

WaitlistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  removeFromWaitlist: PropTypes.func.isRequired,
  waitlistPlacement: PropTypes.number,
};

export default WaitlistModal;
