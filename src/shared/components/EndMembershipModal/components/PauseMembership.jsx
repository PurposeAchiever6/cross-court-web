import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { thisYearFreeFinishedSubscriptionPauses } from 'screens/products/utils';
import { getUserProfile } from 'screens/my-account/reducer';
import InputTextField from 'shared/components/InputTextField';
import InputRadioField from 'shared/components/InputRadioField';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import Button from 'shared/components/Button';
import Label from 'shared/components/Label';
import { subscriptionPeriodFormattedDate } from 'shared/utils/date';
import { pauseSubscription } from 'screens/products/actionCreators';

export const PauseMembership = ({ closeHandler }) => {
  const [reason, setReason] = useState(null);
  const [reasonOpenAnswer, setResasonOpenAnswer] = useState('');
  const currentUser = useSelector(getUserProfile);
  const dispatch = useDispatch();

  const activeSubscription = currentUser?.activeSubscription;
  const canFreePause = activeSubscription?.canFreePause;
  const thisYearFreeFinishedPauses = thisYearFreeFinishedSubscriptionPauses(activeSubscription);

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
    dispatch(pauseSubscription(activeSubscription, pauseReason));
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
    <div className="text-sm">
      {!canFreePause && (
        <p className="mb-4">
          Looks like your {activeSubscription?.freePausesPerYear} free membership pauses this year
          have been used.
        </p>
      )}
      <p className="mb-4">
        You can freeze your membership for 1 month up to {activeSubscription?.freePausesPerYear}{' '}
        times per year. Once the freeze period ends, your membership will revert to regular monthly
        billing.
      </p>
      <p className="mb-4">
        Once you have used your {activeSubscription?.freePausesPerYear} free pauses, you can then
        pause your membership for 1 month for ${activeSubscription?.paidSubscriptionPausePrice} per
        month. During the paid freeze period, you will be charged a monthly suspend fee on the
        regular autopay date.
      </p>
      <p className="mb-4">
        Your membership will freeze at the end of your current billing period,{' '}
        {subscriptionPeriodFormattedDate(activeSubscription?.currentPeriodEnd)}.
      </p>
      {canFreePause && (
        <p className="mb-4">
          You have {(activeSubscription?.freePausesPerYear ?? 2) - thisYearFreeFinishedPauses} free
          pause(s) remaining this year.
        </p>
      )}
      <p className="mb-4">
        Please note, you will not be able to reserve a session once your membership pause starts or
        be able to purchase a drop in credit.
      </p>
      <LineDashedSvg className="mb-6" />
      <div className={`flex flex-wrap gap-2 ${reason === 'other' ? 'mb-4' : 'mb-10'}`}>
        <Label className="mb-3">What is the reason for pausing?*</Label>
        <InputRadioField
          name="reason"
          value="financial-reasons"
          onChange={onChangeReason}
          formik={false}
        >
          Financial reasons
        </InputRadioField>
        <InputRadioField
          name="reason"
          value="taking-a-break"
          onChange={onChangeReason}
          formik={false}
        >
          Taking a break
        </InputRadioField>
        <InputRadioField name="reason" value="traveling" onChange={onChangeReason} formik={false}>
          Traveling
        </InputRadioField>
        <InputRadioField name="reason" value="injury" onChange={onChangeReason} formik={false}>
          Injury
        </InputRadioField>
        <InputRadioField name="reason" value="other" onChange={onChangeReason} formik={false}>
          Other
        </InputRadioField>
      </div>
      {reason === 'other' && (
        <InputTextField
          name="other-open"
          variant="shrink"
          value={reasonOpenAnswer}
          onChange={(e) => setResasonOpenAnswer(e.target.value)}
          className="text-sm mt-3 mb-6"
          hint="Please include at least 4 characters"
          formik={false}
        />
      )}
      <Button disabled={!isReasonSet()} onClick={onPauseClick}>
        Pause Membership
      </Button>
    </div>
  );
};

PauseMembership.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default PauseMembership;
