import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'shared/styles/constants';

const Container = styled.div`
  height: 225px;
  position: relative;

  .img-wrapper {
    height: 100%;
    overflow: hidden;
  }

  .img {
    width: 100%;
    object-fit: cover;
    box-shadow: inset 0 0 0 2000px ${props => props.overlayColor || 'transparent'};
  }

  .title {
    background: ${({ background }) => background};
    position: absolute;
    bottom: -1.5rem;
    left: 1.5rem;
    color: ${colors.white};
    padding: 0 0.8rem;
    text-transform: uppercase;
    margin: 0;
    font-size: 2.25rem;
    letter-spacing: 0.04em;
  }
`;

function Image({ src, children, background, alt }) {
  return (
    <Container background={background === 'purple' ? colors.polarPlum : colors.black}>
      <div className="img-wrapper">
        <img src={src} className="img" alt={alt} />
      </div>
      <h2 className="title">{children}</h2>
    </Container>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Image.defaultProps = {
  background: 'black',
};

export default Image;
