import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { pluralize } from 'shared/utils/helpers';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';

const UserCreditsLeft = ({ session, className }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentUser = useSelector(getUserProfile);

  const { skillSession } = session;
  const {
    activeSubscription,
    totalCredits,
    subscriptionSkillSessionCredits,
    unlimitedCredits,
    unlimitedSkillSessionCredits,
  } = currentUser;

  if (!isAuthenticated) {
    return null;
  }

  let heading = null;
  let subheading = null;

  if (skillSession) {
    if (unlimitedCredits || unlimitedSkillSessionCredits) {
      heading = 'Unlimited sklz sessions';
    } else {
      const totalSkillSessionCredits = totalCredits + subscriptionSkillSessionCredits;

      heading = `${totalSkillSessionCredits} sklz ${pluralize('credit', totalSkillSessionCredits)}`;
      subheading = activeSubscription ? 'Left this month' : 'Available';
    }
  } else {
    if (unlimitedCredits) {
      heading = 'Unlimited sessions';
    }

    heading = `${totalCredits || 'No'} ${pluralize('credit', totalCredits)}`;
    subheading = activeSubscription ? 'Left this month' : 'Available';
  }

  return (
    <div className={className}>
      <span className="block shapiro95_super_wide text-sm sm:text-base">{heading}</span>
      <span className="block text-white text-opacity-60 text-xs sm:text-sm">{subheading}</span>
    </div>
  );
};

UserCreditsLeft.defaultProps = {
  className: '',
};

UserCreditsLeft.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default UserCreditsLeft;
