import React from 'react';
import BackButton from 'shared/components/BackButton';
import PropTypes from 'prop-types';

const SessionHeader = ({ sessionInfo }) => {
  const { isOpenClub } = sessionInfo;

  return (
    <div className="md:flex py-4 md:py-8 font-shapiro95_super_wide">
      <BackButton className="ml-8 mt-4 md:mt-0" />
      <h2 className="md:ml-8 text-center uppercase font-normal py-8 md:py-0 text-2xl">
        {`${sessionInfo.location.name} ${isOpenClub ? 'OPEN CLUB' : 'SESSION'}`}
      </h2>
    </div>
  );
};

SessionHeader.propTypes = {
  sessionInfo: PropTypes.shape({
    isOpenClub: PropTypes.bool,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default SessionHeader;
