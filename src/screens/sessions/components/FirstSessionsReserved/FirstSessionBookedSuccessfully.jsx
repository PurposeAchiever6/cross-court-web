import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { capitalize } from 'shared/utils/helpers';
import { getUserProfile } from 'screens/my-account/reducer';

const FirstSessionBookedSuccessfully = ({ className }) => {
  const userProfile = useSelector(getUserProfile);

  return (
    <div className={className}>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-shapiro95_super_wide uppercase mb-1">
          {`Thanks ${capitalize(userProfile.firstName)}`}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-shapiro95_super_wide uppercase mb-6 sm:mb-10">
          Your first session is booked!
        </h2>
        <div>
          <p className="mb-4">
            Good to see you're also tired of long waits at the park, arguing over foul calls, and
            consistently bad experience trying to hoop
          </p>
          <p>Congrats on taking the first step in reviving your athletic career!</p>
        </div>
      </div>
    </div>
  );
};

FirstSessionBookedSuccessfully.defaultProps = {
  className: '',
};

FirstSessionBookedSuccessfully.propTypes = {
  className: PropTypes.string,
};

export default FirstSessionBookedSuccessfully;
