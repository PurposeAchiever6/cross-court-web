import React from 'react';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import PropTypes from 'prop-types';

const JoinTheCCTeam = ({ className }) => {
  const env = runtimeEnv();
  const percentageDiscount = env.REACT_APP_FIRST_TIMER_PROMO_CODE_PERCENTAGE_DISCOUNT;

  return (
    <div className={className}>
      <div className="md:flex md:items-center mb-8 md:mb-10">
        <div className="uppercase whitespace-nowrap md:pr-8 mb-5 md:mb-0">
          <div className="font-dharma_gothic_cexbold text-8xl md:text-10xl text-center md:text-left">
            Join The CCTeam
          </div>
          <div className="text-cc-purple text-sm md:text-lg font-shapiro95_super_wide text-center md:-mt-5">
            {`${percentageDiscount}% off your first month`}
          </div>
        </div>
        <p className="font-shapiro96_inclined_wide uppercase text-xl lg:text-3xl max-w-xl text-center md:text-left md:pl-8 md:-mt-6">
          Offer expires after first session
        </p>
      </div>
    </div>
  );
};

JoinTheCCTeam.defaultProps = {
  className: '',
};

JoinTheCCTeam.propTypes = {
  className: PropTypes.string,
};

export default JoinTheCCTeam;
