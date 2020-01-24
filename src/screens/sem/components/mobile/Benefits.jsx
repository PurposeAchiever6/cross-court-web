import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Icon from 'shared/components/Icon';
import MoneySvg from 'shared/components/svg/MoneySvg';
import DropsSvg from 'shared/components/svg/DropsSvg';
import WhistleSvg from 'shared/components/svg/WhistleSvg';
import BallSvg from 'shared/components/svg/BallSvg';
import TrophySvg from 'shared/components/svg/TrophySvg';
import MerchSvg from 'shared/components/svg/MerchSvg';

const Container = styled.div`
  background-color: ${colors.offWhite};
  color: ${colors.black};
  font-size: 1.2rem;
  padding-bottom: 7rem;
  text-align: center;

  .title {
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    font-size: 2.5rem;
    letter-spacing: 0.1rem;
    color: ${colors.black};
  }

  .icons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: flex-end;
  }
`;

const Benefits = () => (
  <Container>
    <div className="title">
      YOUR <strong>BENEFITS</strong>
    </div>
    <div className="icons">
      <Icon>
        <MoneySvg />
        <p>Make Money</p>
      </Icon>
      <Icon>
        <DropsSvg />
        <p>Sweat for Free</p>
      </Icon>
      <Icon>
        <WhistleSvg />
        <p>Equity Potential</p>
      </Icon>
      <Icon>
        <BallSvg />
        <p>Face of Crosscourt</p>
      </Icon>
      <Icon>
        <TrophySvg />
        <p>Performance Rewads</p>
      </Icon>
      <Icon>
        <MerchSvg />
        <p>Exclusive Merch</p>
      </Icon>
    </div>
  </Container>
);

export default Benefits;
