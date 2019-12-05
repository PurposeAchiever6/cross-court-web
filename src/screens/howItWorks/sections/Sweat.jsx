import React from 'react';

import SweatSvg from 'shared/components/SweatSvg';
import LockSvg from 'shared/components/LockSvg';
import ArrowLeftSvg from 'shared/components/ArrowLeftSvg';
import SweatImage from '../images/Sweat.jpg';
import Image from '../components/Image';
import Icons from '../components/Icons';
import Icon from '../components/Icon';
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
          <SweatSvg />
          <Text>Catch a sweat</Text>
        </Icon>
        <Icon>
          <LockSvg />
          <Text>Secure the W</Text>
        </Icon>
      </Icons>
      <Par>
        <p>
          Whether you’re looking for an hour long sweat sesh or some upbeat competition, we’ve got
          you covered.
        </p>
        <p>
          Our sessions are fast paced and non stop with a 15 player limit to guarantee you leave
          dripping in sweat. Walking on the court is frowned upon as we expect 60 minutes of
          straight hustle.
        </p>
        <p>
          Each Session is made up of games to 5 minutes or first to 11 by 2s and 3s - whichever
          comes first. Winning team stays for a max of three wins in a row.
        </p>
        <p>
          If there’s less than 15 players, our custom Player Selection Process randomly chooses who
          gets to stay on the court.
        </p>
      </Par>
      <Link to="/signup">
        ready to sweat <ArrowLeftSvg />
      </Link>
    </section>
  );
}

export default Sweat;
