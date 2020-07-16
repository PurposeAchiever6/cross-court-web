import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';

import HeroDesktop from '../images/hero-desktop.jpg';
import HeroMobile from '../images/hero-mobile.jpg';

const HeroSection = styled.section`
  height: 100vh;
  min-height: 600px;
  background-image: url(${HeroDesktop});
  box-shadow: inset 0 0 0 2000px ${colors.blackOverlay};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position-y: initial;

  @media (max-width: 991px) {
    background-image: url(${HeroMobile});
  }
`;

const Hero = ({ children }) => <HeroSection>{children}</HeroSection>;

Hero.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hero;
