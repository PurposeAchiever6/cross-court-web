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
          <Text>Guided Experience</Text>
        </Icon>
      </Icons>
      <Par>
        <p>Each hour-long session is run by our trained Experience Team</p>
        <p>
          Our Session Experience Managers will check you in, bump music, keep score, and make sure
          you leave dripping in sweat, while our Session Officials will enforce the rules and
          maintain order on the court
        </p>
      </Par>
      <Link to={ROUTES.LOCATIONS}>
        reserve now <ArrowLeftSvg />
      </Link>
    </section>
  );
}

export default Showup;
