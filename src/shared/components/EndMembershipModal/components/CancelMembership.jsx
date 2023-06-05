import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { getUserProfile } from 'screens/my-account/reducer';
import Button from 'shared/components/Button';
import LineDashedSvg from 'shared/components/svg/LineDashedSvg';
import List from 'shared/components/List';

const CancelMembership = ({ openFeedbackModal }) => {
  const { activeSubscription } = useSelector(getUserProfile);
  const freePausesPerYear = activeSubscription?.freePausesPerYear;

  const LIST_ITEMS = [
    'We require a 30-day notice so you will be billed for one additional billing period (credits will remain available during this period).',
    'Any unused sessions that have been accumulated during rollover periods will be lost. The credits you currently have saved up will disappear after cancellation.',
    'Access to CC perks such as Office Hours, Highlights, Tournaments, Events, etc will no longer be available.',
    'Your data will be retained for 60 days before it gets deleted from our servers.',
  ];

  return (
    <div>
      <h3 className="text-3xl font-shapiro95_super_wide mb-4">Are you sure?</h3>
      <p className="mb-6">We're sad to see you go, but here's what you need to know:</p>
      <List align="center" items={LIST_ITEMS} className="text-sm" />
      <LineDashedSvg className="mb-6" />
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-xl mr-4" />
        <p className="text-sm">
          Don’t forget, you have the ability to <span className="text-cc-purple-900">pause</span>{' '}
          your membership {freePausesPerYear} times a year free of charge, and can unpause anytime!
        </p>
      </div>
      <Button onClick={openFeedbackModal}>End Membership</Button>
    </div>
  );
};

CancelMembership.propTypes = {
  openFeedbackModal: PropTypes.func.isRequired,
};

export default CancelMembership;
