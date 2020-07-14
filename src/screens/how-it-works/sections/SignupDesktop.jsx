import React from 'react';

import ROUTES from 'shared/constants/routes';
import OnYourTimeSvg from 'shared/components/svg/OnYourTimeSvg';
import GymSvg from 'shared/components/svg/GymSvg';
import Icon from 'shared/components/Icon';

import ArButton from 'shared/components/ArButton';
import Icons from '../components/Icons';
import Text from '../components/Text';

function Signup() {
  return (
    <section className="sign-up section-block text-black">
      <section className="left-section"></section>
      <section className="right-section">
        <p className="title dharma_gothic_cheavy">SIGN UP</p>
        <Icons className="icons">
          <Icon>
            <OnYourTimeSvg />
            <Text>ON YOUR TIME</Text>
          </Icon>
          <Icon>
            <GymSvg />
            <Text>AT A LOCATION NEAR YOU</Text>
          </Icon>
        </Icons>
        <p className="reserve-one">
          Reserve one of the 15 available spots in a session at a location near you. Come solo or
          with friends. Bring your shoes, some water, a towel, and a ball if you have em.
        </p>
        <ArButton link={ROUTES.LOCATIONS} double inverted>
          FIND A SESSION
        </ArButton>
      </section>
    </section>
  );
}

export default Signup;
