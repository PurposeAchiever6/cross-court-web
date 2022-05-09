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
        <p className="md:pl-8 text-sm md:text-lg max-w-xl md:-mt-6 text-center md:text-left">
          By Being a Crosscourt member, you're gaining access to the CCTeam - A community that's
          built for YOU, the modern athlete
        </p>
      </div>
      <p className="md:text-lg">
        <span className="text-lg md:text-xl font-shapiro95_super_wide uppercase">How it works</span>{' '}
        Heavily discounted membership that automatically refills your sessions monthly and gives you
        access to exclusive CC perks
      </p>
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
