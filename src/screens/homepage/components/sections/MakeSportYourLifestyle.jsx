import React from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import styled from 'styled-components';
import sportsLifeStyle from 'screens/homepage/images/make-sport-your-lifestyle.jpg';

const Section = styled.section`
  background-image: url('${sportsLifeStyle}');
  background-position: top;
  background-size: cover;
  min-height: 850px;
  @media (min-width: 992px) {
    background-attachment: fixed;
  }

  ::after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    display: block;
    height: 100vh;
    min-height: 850px;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .title-and-buttons-block {
    padding: 0 32px;
    position: relative;
    text-align: center;
    z-index: 2;
    .title {
      animation: 2000ms ease-out 500ms 1 both topFadeInAndSlideIn;
      font-size: 30px;
      line-height: 30px;
      @media (min-width: 992px) {
        font-size: 50px;
        line-height: 50px;
      }
    }
    .primary-button {
      animation: 500ms ease-out 2500ms 1 both fadeIn;
      display: block;
      margin: 0 auto;
      max-width: 200px;
      @media (min-width: 992px) {
        display: inline-block;
        max-width: none;
        margin-top: 50px;
      }
      .first-time-button {
        margin-bottom: 20px;
        width: 100%;
        @media (min-width: 992px) {
          margin: 0 50px 0 0;
          width: auto;
        }
      }
    }
  }

  .crosscourt-big-title {
    bottom: -19.6vw;
    font-size: 45vw;
    left: -0.7vw;
    line-height: 36vw;
    margin: 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    transition: opacity 100ms ease;
    width: 100vw;
    z-index: 1;
  }
`;

const MakeSportYourLifestyle = () => (
  <Section className="section-block text-white">
    <div className="title-and-buttons-block">
      <p className="title shapiro95_super_wide">
        MAKE SPORT YOUR <em className="shapiro96_inclined_wide">LIFESTYLE</em>
      </p>
      <PrimaryButton
        className="first-time-button"
        font="shapiro96_inclined_wide"
        to={ROUTES.HOWITWORKS}
        double
        inverted
      >
        FIRST TIME?
      </PrimaryButton>
      <PrimaryButton to={ROUTES.LOCATIONS} double w="100%">
        BOOK SESSION
      </PrimaryButton>
    </div>
    <p className="crosscourt-big-title dharma_gothic_cheavy_italic">CROSSCOURT</p>
  </Section>
);

export default MakeSportYourLifestyle;
