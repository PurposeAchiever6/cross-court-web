import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'shared/components/Modal';
import Tabs from 'shared/components/Tabs';
import List from 'shared/components/List';

const FORMAT_LIST = [
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

const RULES_LIST = [
  'All fouls are taken out of bounds at the nearest point from foul',
  'All "And 1\'s" result in the basket and ball back (taken out of bounds)',
  'Each team gets 4 fouls per game. All additional fouls result in a single free throw opportunity that counts as two points',
  'All players who commit flagrant and/or aggressive fouls will be subject to ejection and potential membership suspension',
  'Please respect the club and all equipment',
  'No fighting, trash talking, or profanity',
  'No food or drink allowed in the club apart from water bottles with a lid',
  'Guests will not be allowed to enter the court area',
];

const RulesAndFormatModal = ({ isOpen, closeHandler }) => (
  <Modal isOpen={isOpen} closeHandler={closeHandler} size="2xl">
    <Tabs variant="opacity-underline">
      <div label="Format">
        <List className="text-sm" items={FORMAT_LIST} />
      </div>
      <div label="Rules">
        <List className="text-sm" items={RULES_LIST} />
      </div>
    </Tabs>
  </Modal>
);

RulesAndFormatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default RulesAndFormatModal;
