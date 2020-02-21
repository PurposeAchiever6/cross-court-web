import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import device from 'shared/styles/mediaQueries';
import HeroDesktop from '../images/hero-desktop.webp';
import HeroMobile from '../images/hero-mobile.webp';

const HeroSection = styled.section`
  height: 100vh;
  min-height: 600px;
  background-image: url(${HeroDesktop});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position-y: initial;

  @media ${device.mobile} {
    background-image: url(${HeroMobile});
  }
`;

const Hero = ({ children }) => <HeroSection>{children}</HeroSection>;

Hero.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hero;
