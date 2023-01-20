import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getUserProfile } from 'screens/my-account/reducer';
import Modal from 'shared/components/Modal';
import InputTextField from 'shared/components/InputTextField';
import InputRadioField from 'shared/components/InputRadioField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Label from 'shared/components/Label';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';

export const PauseMembershipModal = ({
  isOpen,
  closeHandler,
  activeSubscription,
  pauseSubscriptionAction,
  canFreePause,
  thisYearFreeFinishedPauses,
}) => {
  const [reason, setReason] = useState(null);
  const [reasonOpenAnswer, setResasonOpenAnswer] = useState('');
  const currentUser = useSelector(getUserProfile);

  const onClose = () => {
    setReason(null);
    setResasonOpenAnswer('');
    closeHandler();
  };

  const onChangeReason = (e) => {
    const { value } = e.target;
    setReason(value);
  };

  const onPauseClick = () => {
    const pauseReason = reason === 'other' ? reasonOpenAnswer : reason;
    pauseSubscriptionAction(pauseReason);
    onClose();
  };

  const isReasonSet = () => {
    if (!reason) {
      return false;
    }

    if (reason !== 'other') {
      return true;
    }

    return reasonOpenAnswer.trim().length >= 4;
  };

  return (
    <Modal isOpen={isOpen} closeHandler={onClose} title="Enter Offseason" size="lg">
      <div>
        {!canFreePause && (
          <p className="mb-4">
            Hey {currentUser.firstName}, looks like your {activeSubscription?.freePausesPerYear}{' '}
            free membership pauses this year have been used.
          </p>
        )}
        <p className="mb-4">
          You can freeze your membership for 1 month up to {activeSubscription?.freePausesPerYear}{' '}
          times per year. Once the freeze period ends, your membership will revert to regular
          monthly billing.
        </p>
        <p className="mb-4">
          Once you have used your {activeSubscription?.freePausesPerYear} free pauses, you can then
          pause your membership for 1 month for ${activeSubscription?.paidSubscriptionPausePrice}{' '}
          per month. During the paid freeze period, you will be charged a monthly suspend fee on the
          regular autopay date.
        </p>
        <p className="mb-4">
          Your membership will freeze at the end of your current billing period,{' '}
          {subscriptionPeriodFormattedDate(activeSubscription?.currentPeriodEnd)}.
        </p>
        {canFreePause && (
          <p className="mb-4">
            You have {(activeSubscription?.freePausesPerYear ?? 2) - thisYearFreeFinishedPauses}{' '}
            free pause(s) remaining this year.
          </p>
        )}
        <p className="mb-4">
          Please note, you will not be able to reserve a session once your membership pause starts
          or be able to purchase a drop in credit.
        </p>
        <div className="mb-6">
          <Label className="mb-3">What is the reason for pausing?*</Label>
          <InputRadioField
            name="reason"
            value="financial-reasons"
            variant="cc-ball"
            onChange={onChangeReason}
            className="mb-2"
            formik={false}
          >
            Financial reasons
          </InputRadioField>
          <InputRadioField
            name="reason"
            value="taking-a-break"
            variant="cc-ball"
            onChange={onChangeReason}
            className="mb-2"
            formik={false}
          >
            Taking a break
          </InputRadioField>
          <InputRadioField
            name="reason"
            value="traveling"
            variant="cc-ball"
            onChange={onChangeReason}
            className="mb-2"
            formik={false}
          >
            Traveling
          </InputRadioField>
          <InputRadioField
            name="reason"
            value="injury"
            variant="cc-ball"
            onChange={onChangeReason}
            className="mb-2"
            formik={false}
          >
            Injury
          </InputRadioField>
          <InputRadioField
            name="reason"
            value="other"
            variant="cc-ball"
            onChange={onChangeReason}
            formik={false}
          >
            Other
          </InputRadioField>
          {reason === 'other' && (
            <InputTextField
              name="other-open"
              variant="shrink"
              value={reasonOpenAnswer}
              onChange={(e) => setResasonOpenAnswer(e.target.value)}
              className="text-sm mt-3"
              hint="Please include at least 4 characters"
              formik={false}
            />
          )}
        </div>
        <div className="text-center">
          <PrimaryButton disabled={!isReasonSet()} onClick={onPauseClick}>
            Pause Membership
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

PauseMembershipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  activeSubscription: PropTypes.shape().isRequired,
  pauseSubscriptionAction: PropTypes.func.isRequired,
  canFreePause: PropTypes.bool.isRequired,
  thisYearFreeFinishedPauses: PropTypes.number.isRequired,
};

export default PauseMembershipModal;
