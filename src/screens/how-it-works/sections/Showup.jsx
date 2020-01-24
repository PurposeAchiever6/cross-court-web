import React from 'react';
import ROUTES from 'shared/constants/routes';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import MerchSvg from 'shared/components/svg/MerchSvg';
import TimerSvg from 'shared/components/svg/TimerSvg';
import Icon from 'shared/components/Icon';
import ShowupImage from '../images/Showup.jpg';
import Icons from '../components/Icons';
import Image from '../components/Image';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

function Showup() {
  return (
    <section>
      <Image src={ShowupImage} background="purple" alt="match being played">
        show <em>up</em>
      </Image>
      <Icons>
        <Icon>
          <MerchSvg />
          <Text>All equipment provided</Text>
        </Icon>
        <Icon>
          <TimerSvg />
          <Text>Arrive at least 10 minutes early</Text>
        </Icon>
      </Icons>
      <Par>
        <p>
          Athletic shoes are required, and we also suggest bringing a ball, water, and towel. We’ll
          take care of the rest.
        </p>
        <p>
          Arriving early is recommended since the first 10 players to check in start the first game.
        </p>
        <p>
          When you arrive, your Session Experience Manager will check you in and hand you a jersey.
          Depending on the order of your arrival, your SEM will let you know which color jersey to
          wear.
        </p>
        <p>
          In the meantime, talk strategy with your teammates, or stretch out until you hear the
          whistle.
        </p>
      </Par>
      <Link to={ROUTES.LOCATIONS}>
        reserve now <ArrowLeftSvg />
      </Link>
    </section>
  );
}

export default Showup;
