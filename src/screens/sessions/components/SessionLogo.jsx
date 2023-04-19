import React from 'react';
import PropTypes from 'prop-types';

import sklzLogoWhite from 'shared/images/logos/sklz-white.png';
import openClubLogoWhite from 'shared/images/logos/open-club-white.png';
import sessionsLogoWhite from 'shared/images/logos/sessions-white.png';

const SessionLogo = ({ session, className }) => {
  const { isOpenClub, skillSession } = session;

  const logo = (() => {
    if (isOpenClub) {
      return { src: openClubLogoWhite, alt: 'open-club-logo' };
    }

    if (skillSession) {
      return { src: sklzLogoWhite, alt: 'skill-session-logo' };
    }

    return { src: sessionsLogoWhite, alt: 'session-logo' };
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
