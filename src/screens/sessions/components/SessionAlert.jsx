import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserProfile } from 'screens/my-account/reducer';
import { userOutsideOfSessionSkillLevel } from 'shared/utils/user';
import Alert from 'shared/components/Alert';

const SessionAlert = ({ session, className }) => {
  const currentUser = useSelector(getUserProfile);

  const { past, skillSession, isOpenClub } = session;

  const alertData = (() => {
    if (past) {
      return { variant: 'notice', text: 'This session has already occurred' };
    }

    if (!isOpenClub && !skillSession && userOutsideOfSessionSkillLevel(currentUser, session)) {
      return {
        variant: 'warning',
        text: 'You have selected a session outside your personal skill level bracket.',
      };
    }

    return null;
  })();

  if (!alertData) {
    return;
  }

  return (
    <Alert variant={alertData.variant} className={className}>
      {alertData.text}
    </Alert>
  );
};

SessionAlert.defaultProps = {
  className: '',
};

SessionAlert.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionAlert;
