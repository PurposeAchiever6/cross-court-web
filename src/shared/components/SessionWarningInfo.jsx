/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';
import WarningTriangle from 'shared/images/warning-triangle.png';

const SessionWarningInfo = ({
  className,
  isLegalAge,
  reserved,
  onWaitlist,
  cannotReserveBecauseSkillLevel,
  skillLevelName,
  reserveTeamAllowed,
  isReserveTeam,
  full,
  spotsLeft,
  past,
}) => {
  const warningText = () => {
    if (!isLegalAge) {
      return 'Must be 18+';
    } else {
      if (!reserved && !onWaitlist && !past) {
        if (cannotReserveBecauseSkillLevel) {
          return skillLevelName;
        } else {
          if (isReserveTeam && !reserveTeamAllowed) {
            return (
              <>
                Reserve team <br />
                restricted
              </>
            );
          }

          if (full) {
            return 'Session full';
          }

          if (spotsLeft <= 5) {
            return 'Few spots left';
          }
        }
      }
    }
  };

  const text = warningText();

  return text ? (
    <div className={`flex justify-center items-center whitespace-nowrap ${className}`}>
      <img alt="warning-icon" className="w-4 h-4" src={WarningTriangle} />
      <p className="text-2xs sm:text-xs uppercase mt-1 ml-2">{text}</p>
    </div>
  ) : null;
};

SessionWarningInfo.defaultProps = {
  skillLevelName: null,
  className: '',
};

SessionWarningInfo.propTypes = {
  className: PropTypes.string,
  skillLevelName: PropTypes.string,
  isLegalAge: PropTypes.bool.isRequired,
  reserved: PropTypes.bool.isRequired,
  onWaitlist: PropTypes.bool.isRequired,
  cannotReserveBecauseSkillLevel: PropTypes.bool.isRequired,
  reserveTeamAllowed: PropTypes.bool.isRequired,
  isReserveTeam: PropTypes.bool.isRequired,
  full: PropTypes.bool.isRequired,
  spotsLeft: PropTypes.number.isRequired,
  past: PropTypes.bool.isRequired,
};

export default SessionWarningInfo;
