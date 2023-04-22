import React from 'react';
import PropTypes from 'prop-types';

import EmployeeCard from 'screens/sessions/components/EmployeeCard';
import trustTheProgressImg from 'screens/sessions/images/trust-the-progress.jpeg';
import trustTheProgressShapeImg from 'shared/images/trust-the-progress-shape.png';

const SessionOfficials = ({ session, className }) => {
  const { normalSession, skillSession, isOpenClub, sem, referee, coach } = session;

  const title = (() => {
    if (isOpenClub) {
      return null;
    }

    return skillSession ? 'Session Coach' : 'Session Officials';
  })();

  return (
    <div className={className}>
      <h4 className={`font-shapiro95_super_wide text-lg md:text-2xl ${title ? 'mb-6' : 'mt-16'}`}>
        {title}
      </h4>
      <div className="xl:flex">
        <div className="w-full">
          {!isOpenClub && (
            <div className="mb-20 xl:mb-0">
              {normalSession && (
                <div className="md:flex">
                  <EmployeeCard user={sem} className="w-full md:mr-3 mb-10 md:mb-0" />
                  <EmployeeCard user={referee} className="w-full md:ml-3" />
                </div>
              )}
              {skillSession && <EmployeeCard user={coach} />}
            </div>
          )}
        </div>
        <div className="w-full relative xl:pl-6">
          <img alt="trust-the-progress-img" src={trustTheProgressImg} className="w-full" />
          <img
            alt="trust-the-progress-shape-img"
            src={trustTheProgressShapeImg}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 xl:translate-x-0 xl:left-10 w-1/3 max-w-2xs"
          />
        </div>
      </div>
    </div>
  );
};

SessionOfficials.defaultProps = {
  className: '',
};

SessionOfficials.propTypes = {
  session: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

export default SessionOfficials;
