import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = styled.div(
  props => `
  background-image: url(${props.img});
  background-position: top;
  box-shadow: inset 0 0 0 2000px ${props.overlayColor};
  height: 25vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`
);

const ImageContainer = ({ img, overlayColor, children }) => (
  <Image img={img} overlayColor={overlayColor}>
    {children}
  </Image>
);

ImageContainer.propTypes = {
  img: PropTypes.string.isRequired,
  overlayColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ImageContainer;
