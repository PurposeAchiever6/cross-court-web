import React from 'react';

import ROUTES from 'shared/constants/routes';
import ClockSvg from 'shared/components/svg/ClockSvg';
import FieldSvg from 'shared/components/svg/FieldSvg';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import Icon from 'shared/components/Icon';

import SignupImage from '../images/signup-mobile.jpg';
import Icons from '../components/Icons';
import Image from '../components/Image';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function Signup() {
  return (
    <section>
      <Image src={SignupImage} alt="player celebrating">
        sign <em>up</em>
      </Image>
      <Icons>
        <Icon>
          <ClockSvg />
          <Text>On your time</Text>
        </Icon>
        <Icon>
          <FieldSvg />
          <Text>At a gym near you</Text>
        </Icon>
      </Icons>
      <Par>
        <p>
          Reserve one of the 15 available spots in a session at a location near you. Come solo or
          bring a friend. Bring your shoes, some water, a towel, and a ball if you have em.
        </p>
      </Par>
      <Link to={ROUTES.LOCATIONS}>
        find a session <ArrowLeftSvg />
      </Link>
    </section>
  );
}

export default Signup;
