import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import Icon from 'shared/components/Icon';
import { ReactComponent as CompetitiveWageSvg } from 'shared/components/svg/competitive-wage.svg';
import { ReactComponent as FreeSessionsSvg } from 'shared/components/svg/free-sessions.svg';
import { ReactComponent as EquitySvg } from 'shared/components/svg/equity.svg';
import { ReactComponent as RewardsSvg } from 'shared/components/svg/rewards.svg';
import { ReactComponent as JerseySvg } from 'shared/components/svg/jersey.svg';
import { ReactComponent as CrosscourtFace } from 'shared/components/svg/crosscourt-face.svg';

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
    align-items: baseline;
  }
`;

const Benefits = () => (
  <Container>
    <div className="title">WHAT YOU GET</div>
    <div className="icons">
      <Icon>
        <CompetitiveWageSvg />
        <p>Competitive wage</p>
      </Icon>
      <Icon>
        <FreeSessionsSvg />
        <p>Free sessions</p>
      </Icon>
      <Icon>
        <EquitySvg />
        <p>Equity</p>
      </Icon>
      <Icon>
        <RewardsSvg />
        <p>Performance Rewads</p>
      </Icon>
      <Icon>
        <JerseySvg />
        <p>Exclusive Merch</p>
      </Icon>
      <Icon>
        <CrosscourtFace />
        <p>Face of Crosscourt</p>
      </Icon>
    </div>
  </Container>
);

export default Benefits;
