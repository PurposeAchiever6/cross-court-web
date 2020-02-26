import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import colors from 'shared/styles/constants';
import InfoSvg from 'shared/components/svg/InfoSvg';
import LEVELS from 'shared/constants/levels';
import TEXT from 'shared/constants/text';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  p {
    margin: 0.2rem 0;
  }

  span {
    text-align: center;
    padding: 0.3rem 1rem;
    background-color: ${colors.darkGrey};
    border-radius: 5rem;
    width: 6rem;
    color: ${colors.white};
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-right: 1rem;
    line-height: 1rem;
  }
`;

const SessionLevel = ({ level, showInfo = false }) => {
  if (level === LEVELS.BASIC) {
    return null;
  }

  return (
    <Container>
      <span>LEVEL 2</span>
      {showInfo && (
        <>
          <InfoSvg dataTip={TEXT.ADVANCED_TOOLTIP} />
          <ReactTooltip place="right" html />
        </>
      )}
    </Container>
  );
};

SessionLevel.propTypes = {
  level: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
};

export default SessionLevel;
