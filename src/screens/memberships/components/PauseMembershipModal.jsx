import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import InputSelectField from 'shared/components/InputSelectField';
import InputTextField from 'shared/components/InputTextField';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Label from 'shared/components/Label';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';

const OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
];

export const PauseMembershipModal = ({
  isOpen,
  closeHandler,
  activeSubscription,
  pauseSubscriptionAction,
}) => {
  const [months, setMonths] = useState(null);
  const [reason, setReason] = useState(null);
  const [reasonOpenAnswer, setResasonOpenAnswer] = useState('');

  const onClose = () => {
    setReason(null);
    setResasonOpenAnswer('');
    closeHandler();
  };

  const onChangeReason = (e) => {
    const { checked, id: value } = e.target;
    setReason(checked ? value : null);
  };

  const onPauseClick = () => {
    const pauseReason = reason === 'other' ? reasonOpenAnswer : reason;
    pauseSubscriptionAction(months, pauseReason);
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
    <Modal isOpen={isOpen} closeHandler={onClose} title="Enter Offseason">
      <div>
        <p className="mb-4">
          You may freeze your membership for a minimum of 1 month or a maximum of 2 months up to{' '}
          {activeSubscription.pausesPerYear} times per year. Once the freeze period ends, your
          membership will revert to regular monthly billing. No payments will be made during the
          freeze period.
        </p>
        <p className="mb-4">
          Your membership will freeze at the end of your current billing period,{' '}
          {subscriptionPeriodFormattedDate(activeSubscription.currentPeriodEnd)}.
        </p>
        <p className="mb-4">
          Please note, you will not be able to reserve a session once your membership pause starts.
        </p>
        <InputSelectField
          name="subscription-pause-months"
          placeholder="Months"
          options={OPTIONS}
          onChange={({ value }) => setMonths(value)}
          className="w-1/2 sm:w-2/5 mx-auto mb-6"
          formik={false}
        />
        <div className="mb-6">
          <Label className="mb-3">What is the reason for pausing?*</Label>
          <InputCheckboxField
            name="financial-reasons"
            variant="cc-ball"
            onChange={onChangeReason}
            value={reason === 'financial-reasons'}
            className="mb-1"
            formik={false}
          >
            Financial reasons
          </InputCheckboxField>
          <InputCheckboxField
            name="taking-a-break"
            variant="cc-ball"
            onChange={onChangeReason}
            value={reason === 'taking-a-break'}
            className="mb-1"
            formik={false}
          >
            Taking a break
          </InputCheckboxField>
          <InputCheckboxField
            name="traveling"
            variant="cc-ball"
            onChange={onChangeReason}
            value={reason === 'traveling'}
            className="mb-1"
            formik={false}
          >
            Traveling
          </InputCheckboxField>
          <InputCheckboxField
            name="injury"
            variant="cc-ball"
            onChange={onChangeReason}
            value={reason === 'injury'}
            className="mb-1"
            formik={false}
          >
            Injury
          </InputCheckboxField>
          <InputCheckboxField
            name="other"
            variant="cc-ball"
            onChange={onChangeReason}
            value={reason === 'other'}
            formik={false}
          >
            Other
          </InputCheckboxField>
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
          <PrimaryButton disabled={!months || !isReasonSet()} onClick={onPauseClick}>
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
};

export default PauseMembershipModal;
