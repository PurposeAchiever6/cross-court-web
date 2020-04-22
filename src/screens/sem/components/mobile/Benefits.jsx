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
