import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import BackButton from 'shared/components/BackButton';
import InfoCircleIcon from 'shared/components/InfoCircleIcon';
import { semSessionFormatTime } from 'shared/utils/date';

const Container = styled.div`
  width: 90%;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 100;
  color: ${colors.black};
  letter-spacing: 0.2rem;
  display: flex;
  align-items: baseline;
  justify-content: space-around;

  .title {
    flex: 3;
  }

  .bold {
    font-weight: 500;
  }

  .back-btn {
    padding: 0;
    margin-left: 0;
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
`;

const Header = ({ sessionInfo: { name, startTime, time } }) => {
  return (
    <Container>
      <BackButton className="back-btn" showText={false} />
      <div className="title">
        <p>{name}</p>
        <p className="bold">session</p>
        <p className="time">{semSessionFormatTime(startTime, time)}</p>
      </div>
      <button className="icon-btn" type="button">
        <InfoCircleIcon />
      </button>
    </Container>
  );
};

Header.propTypes = {
  sessionInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
