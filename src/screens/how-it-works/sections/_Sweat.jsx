import React from 'react';

import ROUTES from 'shared/constants/routes';
import { ReactComponent as CatchASweatSvg } from 'shared/components/svg/catch-a-sweat.svg';
import { ReactComponent as SecureTheWSvg } from 'shared/components/svg/secure-the-w.svg';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import Icon from 'shared/components/Icon';

import SweatImage from '../images/sweat-mobile.jpg';
import Icons from '../components/Icons';
import Image from '../components/Image';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function Sweat() {
  return (
    <section>
      <Image src={SweatImage} alt="match being played">
        <em>sweat</em>
      </Image>
      <Icons>
        <Icon>
          <CatchASweatSvg />
          <Text>Catch a sweat</Text>
        </Icon>
        <Icon>
          <SecureTheWSvg />
          <Text>Secure the W</Text>
        </Icon>
      </Icons>
      <Par>
        <p>
          Whether you’re looking to sweat for 60 minutes or get a little competitive, we’ve got you
          covered.
        </p>
        <p>
          Our high intensity sessions are fast paced and non stop. Games are to 5 minutes or first
          to 11 by 2’s and 3’s, whichever comes first. Winner stays, but only for a max of 3 games
          in a row to ensure you leave dripping in sweat.
        </p>
      </Par>
      <Link to={ROUTES.LOCATIONS}>
        ready to sweat <ArrowLeftSvg />
      </Link>
    </section>
  );
}

export default Sweat;
