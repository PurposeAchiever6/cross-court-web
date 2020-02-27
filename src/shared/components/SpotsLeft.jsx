import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  span {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
  }
`;

const SpotsLeft = ({ spotsLeft }) => {
  if (spotsLeft > 5) {
    return null;
  }

  return (
    <Container>
      <span>{spotsLeft} Spots Left</span>
    </Container>
  );
};

SpotsLeft.propTypes = {
  spotsLeft: PropTypes.number.isRequired,
};

export default SpotsLeft;
