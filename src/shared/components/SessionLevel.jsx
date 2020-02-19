import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import colors from 'shared/styles/constants';
import { advancedExplanation } from 'shared/texts/constants';
import InfoSvg from 'shared/components/svg/InfoSvg';

const Container = styled.div`
  p {
    margin: 0.2rem 0;
  }

  span {
    text-align: center;
    padding: 0.3rem 1rem;
    background-color: ${colors.red};
    border-radius: 5rem;
    width: 6rem;
    display: flex;
    color: ${colors.white};
    text-transform: uppercase;
    font-size: 0.8rem;
    display: inline;
    margin-right: 1rem;
    line-height: 2rem;
  }
`;

const SessionLevel = ({ level, showInfo = false }) => (
  <Container>
    <span>{level}</span>
    {showInfo && (
      <>
        <InfoSvg dataTip={advancedExplanation} />
        <ReactTooltip place="right" html />
      </>
    )}
  </Container>
);

SessionLevel.propTypes = {
  level: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
};

export default SessionLevel;
