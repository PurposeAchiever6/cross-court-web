import React from 'react';
import PropTypes from 'prop-types';

import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import officeHoursLogo from 'shared/images/logos/office-hours-white.png';
import sessionLogoWhite from 'shared/images/logos/session-white.png';

const SessionLogo = ({ session, className }) => {
  const { isOpenClub, skillSession } = session;

  const logo = (() => {
    if (isOpenClub) {
      return { src: officeHoursLogo, alt: 'office-hours-logo' };
    }

    if (skillSession) {
      return { src: sklzLogoWhite, alt: 'skill-session-logo' };
    }

    return { src: sessionLogoWhite, alt: 'session-logo' };
  })();

  return <img alt={logo.alt} src={logo.src} className={className} />;
};

SessionLogo.defaultProps = {
  className: '',
};

SessionLogo.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};
export default SessionLogo;
