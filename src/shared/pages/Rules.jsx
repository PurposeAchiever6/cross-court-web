import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import BasketballSvg from 'shared/components/svg/BasketballSvg';

const FORMAT = [
  '60 minutes (3 minute shoot-around)',
  "Games to 11 by 2's and 3's (win by 1) or 5 minutes, whichever comes first (the team leading after 5 minutes is the winner)",
  '15 total players (5 on 5 with one team resting)',
  'The first 10 players to the club will be seperated into two teams (first 5 light + second 5 dark) and begin the session (remaining 11-15 players will start the 2nd game)',
  'Winning team stays on (max of 3 games in a row)',
  'All "free throws" are a single free throw that counts as two points',
  'The clock only stops under 10 seconds',
  'All fouls under 10 seconds result in a single free throw that counts as two points',
  'If a game is tied after 5 minutes, we tip off for a "next basket wins" scenario',
  "If there are less than 15 players in a session and your team loses, you will line up on our numbered floor decals and we'll randomly select the necessary amount of players to fill out the team that was resting",
  'Each session will end on the hour regardless of time left in the last game',
  'Anyone participating in back-to-back sessions will need to recheck in at the front desk',
  'Please return your rented jersey to the courtside bin after your session',
];

const RULES = [
  'All fouls are taken out of bounds at the nearest point from foul',
  'All "And 1\'s" result in the basket and ball back (taken out of bounds)',
  'Each team gets 4 fouls per game. All additional fouls result in a single free throw opportunity that counts as two points',
  'All players who commit flagrant and/or aggressive fouls will be subject to ejection and potential membership suspension',
  'Please respect the club and all equipment',
  'No fighting, trash talking, or profanity',
  'No food or drink allowed in the club apart from water bottles with a lid',
  'Guests will not be allowed to enter the court area',
];

const StyledTitle = styled.h1`
  .title {
    font-family: shapiro95_super_wide;
    color: ${colors.brandBlack};
    font-size: 28px;
    line-height: 28px;
    @media (min-width: 992px) {
      font-size: 38px;
      line-height: 38px;
    }
  }

  .subtitle {
    color: ${colors.brandBlack};
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandBlack};
    font-family: shapiro95_super_wide;
    font-size: 44px;
    line-height: 44px;
    @media (min-width: 992px) {
      font-size: 60px;
      line-height: 60px;
    }
  }
`;

const Rules = () => (
  <div className="flex flex-col p-4 md:p-8">
    <StyledTitle className="flex flex-col mb-4 md:mb-8">
      <span className="title">FORMAT &amp;</span>
      <span className="subtitle">RULES</span>
    </StyledTitle>
    <h2 className="font-shapiro95_super_wide text-cc-black text-2xl md:text-4xl">FORMAT</h2>
    <div className="ml-2">
      {FORMAT.map((format, index) => (
        <div key={`format-${index}`} className="flex my-3 md:my-4 md:text-lg items-center">
          <BasketballSvg className="mr-2 md:mr-4 w-4 md:w-6 h-4 md:h-6" />
          <p className="w-10/12">{format}</p>
        </div>
      ))}
    </div>
    <h2 className="font-shapiro95_super_wide text-cc-black text-2xl md:text-4xl mt-8">RULES</h2>
    <div className="ml-2">
      {RULES.map((rule, index) => (
        <div key={`rule-${index}`} className="flex my-3 md:my-4 md:text-lg items-center">
          <BasketballSvg className="mr-2 md:mr-4 w-4 md:w-6 h-4 md:h-6" />
          <p className="w-10/12">{rule}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Rules;
