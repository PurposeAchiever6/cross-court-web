import React from 'react';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import playButtonWhiteIcon from 'shared/images/play-button-white.png';
import newToCrosscourtMobileImg from 'screens/how-it-works/images/new-to-crosscourt-mobile.png';
import newToCrosscourt from 'screens/how-it-works/images/new-to-crosscourt.png';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const Section = styled.section`
  color: white;
  background-color: ${colors.brandBlack};
  background-position: top center;
  background-size: cover;
  display: block;
  height: 100vh;
  padding: 100px 32px 0;

  @media (min-width: 992px) {
    background-image: url(${newToCrosscourt});
    padding: 200px 32px 0;
  }

  .title-block {
    animation: 2000ms ease-out 500ms 1 both topFadeInAndSlideIn;
    .heading-sprite {
      background-position: 0px -82px;
      height: 46px;
      margin-bottom: 20px !important;

      @media (min-width: 992px) {
        background-position: 0px -153px;
        height: 86px;
      }
    }
  }

  .check-it-out {
    img {
      height: 22px;
      left: 12px;
      position: absolute;
      top: 6px;
      width: 22px;
    }
    .text {
      margin-left: 25px;
    }
  }

  .new-to-crosscourt .check-it-out img.play-button-white {
    display: inline-block;
  }

  .new-to-crosscourt .check-it-out:hover img.play-button-white {
    display: none;
  }

  .new-to-crosscourt .check-it-out .play-button-purple {
    display: none;
  }

  .new-to-crosscourt .check-it-out:hover img.play-button-purple {
    display: inline-block;
  }

  .mobile-image {
    display: block;
    height: auto;
    margin: 37px 0 0 -40px;
    max-width: 50vh;
    @media (min-width: 992px) {
      display: none;
    }
  }
`;

const NewToCrosscourt = () => {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector('.the-session-video').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.the-session-video video').play();
  };

  return (
    <Section>
      <div className="title-block">
        <p className="heading-sprite" />
      </div>
      <PrimaryButton inverted bg={colors.brandBlack} className="check-it-out" onClick={handleClick}>
        <img alt="" className="play-button-white" src={playButtonWhiteIcon} />
        <img alt="" className="play-button-purple" src={playButtonPurpleIcon} />
        <span className="text">CHECK IT OUT</span>
      </PrimaryButton>
      <img alt="" className="mobile-image" src={newToCrosscourtMobileImg} />
    </Section>
  );
};

export default NewToCrosscourt;
