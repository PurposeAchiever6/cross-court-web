import React from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import styled from 'styled-components';
import sportsLifeStyle from 'screens/homepage/images/basketball-gym-lockers.jpg';
import basketballGymGuy from 'screens/homepage/images/basketball-gym-guy.png';
import basketballGym from 'screens/homepage/images/basketball-gym.jpg';

const Section = styled.section`
  background-image: url('${basketballGym}');
  background-position: center;
  @media (min-width: 768px) {
    background-image: url('${sportsLifeStyle}');
    background-position: 0 -350px;
    background-color: #041634;
    background-blend-mode: lighten;
  }

  .animate {
    animation: 2000ms ease-out 500ms 1 both topFadeInAndSlideIn;
  }
`;

const BigTitle = styled.p`
  bottom: -19.6vw;
  font-size: 45vw;
  left: -0.7vw;
  line-height: 36vw;
  transition: opacity 100ms ease;
`;

const MakeSportYourLifestyle = () => (
  <Section className="section-block text-white md:bg-fixed bg-no-repeat bg-cover relative">
    <img
      alt="make-sports-your-lifestyle"
      src={basketballGymGuy}
      className="absolute -top-2.5 z-20 hidden md:block"
    />
    <h1 className="animate mb-8 md:mb-0 title font-shapiro95_super_wide text-3xl md:text-5xl 2xl:text-6xl text-center">
      <span className="md:absolute md:left-36 2xl:left-52 md:-top-20 2xl:-top-14">MAKE SPORT </span>
      <span className="lg:absolute md:right-24 2xl:right-40 md:-top-20 2xl:-top-14">
        YOUR <em className="shapiro96_inclined_wide">LIFESTYLE</em>
      </span>
    </h1>
    <div className="animate lg:absolute md:right-24 2xl:right-40 md:top-62 2xl:bottom-96 text-center md:block flex flex-col z-50">
      <PrimaryButton
        contentClasses="w-3/4 md:w-auto"
        className="md:mr-8 mb-8 md:mb-0 first-time"
        to={ROUTES.HOWITWORKS}
        bg="transparent"
      >
        FIRST TIME?
      </PrimaryButton>
      <PrimaryButton contentClasses="w-3/4 md:w-auto" to={ROUTES.LOCATIONS}>
        BOOK SESSION
      </PrimaryButton>
    </div>
    <BigTitle className="crosscourt-big-title w-screen text-center absolute m-0 opacity-0 font-dharma_gothic_cheavy_italic z-40">
      CROSSCOURT
    </BigTitle>
  </Section>
);

export default MakeSportYourLifestyle;
