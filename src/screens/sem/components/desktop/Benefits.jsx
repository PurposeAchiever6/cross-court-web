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
  text-align: center;
  color: ${colors.black};
  font-size: 1.2rem;
  padding-top: 12rem;
  padding-bottom: 12rem;

  .title {
    padding-bottom: 5rem;
    font-size: 3rem;
    letter-spacing: 0.1rem;
    margin: 0;
    color: ${colors.black};
  }

  .icons {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
`;

const Benefits = () => (
  <Container>
    <div className="title">WHAT YOU GET</div>
    <div className="icons">
      <Icon>
        <MoneySvg />
        <p>Competitive wage</p>
      </Icon>
      <Icon>
        <DropsSvg />
        <p>Free sessions</p>
      </Icon>
      <Icon>
        <WhistleSvg />
        <p>Equity</p>
      </Icon>
      <Icon>
        <TrophySvg />
        <p>Performance Rewads</p>
      </Icon>
      <Icon>
        <MerchSvg />
        <p>Exclusive Merch</p>
      </Icon>
      <Icon>
        <BallSvg />
        <p>Face of Crosscourt</p>
      </Icon>
    </div>
  </Container>
);

export default Benefits;
