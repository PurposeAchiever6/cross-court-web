import React from 'react';
import styled from 'styled-components';

import ROUTES from 'shared/constants/routes';
import ArrowLeftSvg from 'shared/components/svg/ArrowLeftSvg';
import MerchSvg from 'shared/components/svg/MerchSvg';
import TimerSvg from 'shared/components/svg/TimerSvg';
import Icon from 'shared/components/Icon';
import Button from 'shared/components/Button';

import ShowupImage from '../images/showup-mobile.jpg';
import Icons from '../components/Icons';
import Image from '../components/Image';
import Link from '../components/Link';
import Par from '../components/Par';
import Text from '../components/Text';

const Container = styled.div`
  .button {
    padding: 1rem 2rem;
  }

  img {
    object-position: 0 -4rem;
  }
`;

const Showup = () => (
  <Container>
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
        Our Session Experience Managers will check you in, bump music, keep score, and make sure you
        leave dripping in sweat, while our Session Officials will enforce the rules and maintain
        order on the court
      </p>
    </Par>
    <Link to={ROUTES.SEM}>
      <Button className="button">Join the Team</Button>
    </Link>
    <Link to={ROUTES.LOCATIONS}>
      reserve now <ArrowLeftSvg />
    </Link>
  </Container>
);

export default Showup;
