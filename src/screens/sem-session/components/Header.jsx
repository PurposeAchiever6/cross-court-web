import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import BackButton from 'shared/components/BackButton';
import OutlinedButton from 'shared/components/OutlinedButton';
import RightArrowSvg from 'shared/components/svg/RightArrowSvg';
import LeftArrowSvg from 'shared/components/svg/LeftArrowSvg';
import { shortSessionDate, formatSessionTime } from 'shared/utils/date';

import ImageContainer from './ImageContainer';

const Container = styled.div`
  align-items: baseline;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
  color: ${colors.black};
  font-size: 1.4rem;
  font-weight: 100;
  justify-content: space-around;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  width: 100%;

  .title {
    flex: 3;
    color: ${colors.white};
    font-size: 1.3rem;
  }

  .bold {
    font-weight: 500;
  }

  .date {
    font-size: 1rem;
  }

  .back-btn {
    align-self: flex-start;
    margin: 0;
    padding: 0.5rem;
  }

  p {
    margin: 0;
  }

  .icon-btn {
    background-color: ${colors.white};
    border: none;
  }

  .time {
    font-size: 1.2rem;
  }

  .players-list-btn {
    align-self: flex-end;
    height: 3rem;
    line-height: 1rem;
    margin-right: 2rem;
    padding: 1rem;
  }
`;

const SessionsContainer = styled.div`
  align-items: flex-end
  display: flex;
  height: 5rem;
  justify-content: space-between;
  margin: auto;
  padding: 1rem 0;
  width: 90%;

  .session-time {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .align-left {
    text-align: left;
    margin-left: 0.5rem;
  }

  .align-right {
    text-align: right;
    margin-right: 0.5rem;
  }
`;

const Header = ({
  todaySessions,
  selectedSession,
  goToNextSession,
  goToPreviousSession,
  showPlayersModal,
}) => {
  const {
    date,
    session: { time, location },
  } = todaySessions[selectedSession];
  let nextSession;
  let previousSession;
  if (selectedSession < todaySessions.length - 1) {
    nextSession = todaySessions[selectedSession + 1];
  }
  if (selectedSession > 0) {
    previousSession = todaySessions[selectedSession - 1];
  }

  return (
    <Container>
      <ImageContainer img={location.imageUrl} overlayColor={colors.lightblackOverlay}>
        <BackButton className="back-btn" showText={false} color={colors.white} />
        <div className="title">
          <p>{location.name}</p>
          <p className="bold">{formatSessionTime(time)}</p>
          <p className="date">{shortSessionDate(date)}</p>
        </div>
        <Button className="players-list-btn" onClick={showPlayersModal}>
          Players List
        </Button>
      </ImageContainer>
      <SessionsContainer>
        <div>
          {previousSession && (
            <p className="session-time align-left">
              {formatSessionTime(previousSession.session.time)}
            </p>
          )}
          <OutlinedButton disabled={!previousSession} onClick={goToPreviousSession}>
            <LeftArrowSvg disabled={!previousSession} /> Previous
          </OutlinedButton>
        </div>
        <div>
          {nextSession && (
            <p className="session-time align-right">
              {formatSessionTime(nextSession.session.time)}
            </p>
          )}
          <OutlinedButton disabled={!nextSession} onClick={goToNextSession}>
            Next <RightArrowSvg disabled={!nextSession} />
          </OutlinedButton>
        </div>
      </SessionsContainer>
    </Container>
  );
};

Header.propTypes = {
  todaySessions: PropTypes.arrayOf(PropTypes.object),
  selectedSession: PropTypes.number,
  goToNextSession: PropTypes.func,
  goToPreviousSession: PropTypes.func,
  showPlayersModal: PropTypes.func,
};

export default Header;
