import React from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import styled from 'styled-components';
import sportsLifeStyle from 'screens/homepage/images/basketball-gym-lockers.jpeg';
import basketballGymGuy from 'screens/homepage/images/basketball-gym-guy.png';
import basketballGym from 'screens/homepage/images/basketball-gym.jpeg';

const Section = styled.section`
  background-image: url('${basketballGym}');
  background-position: center;

  .animate {
    animation: 2000ms ease-out 1000ms 1 both topFadeInAndSlideIn;
  }

  @media (min-width: 1024px) {
    background-image: url('${sportsLifeStyle}');
    background-position: 0 -350px;

    .title-left {
      width: 50%;
      text-align: right;
      padding-right: 7%;
    }

    .title-right {
      width: 50%;
      text-align: left;
      padding-left: 6%;
    }

    .buttons {
      position: absolute;
      left: 50%;
      z-index: 10;
      padding-left: 3%;
      padding-top: 4.5rem;
    }
  }

  @media (min-width: 1280px) {
    .buttons {
      padding-left: 12%;
    }
  }
`;

const MakeSportYourLifestyle = () => (
  <Section className="relative bg-cc-black bg-no-repeat bg-cover md:bg-fixed min-h-screen overflow-hidden flex flex-col justify-center px-4">
    <h1 className="font-shapiro95_super_wide text-white text-center text-3xl lg:text-4xl xl:text-5xl mb-12 lg:mb-0 lg:flex lg:whitespace-nowrap lg:-mt-20 animate">
      <span className="title-left block">MAKE SPORT</span>
      <span className="title-right block">
        YOUR <em className="shapiro96_inclined_wide">LIFESTYLE</em>
      </span>
    </h1>
    <div className="buttons animate">
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <PrimaryButton
          contentClasses="w-52 sm:mr-8 mb-2 sm:mb-0"
          to={ROUTES.HOWITWORKS}
          bg="transparent"
          color="white"
        >
          FIRST TIME?
        </PrimaryButton>
        <PrimaryButton contentClasses="w-52" to={ROUTES.LOCATIONS}>
          BOOK SESSION
        </PrimaryButton>
      </div>
    </div>
    <img
      alt="make-sports-your-lifestyle"
      src={basketballGymGuy}
      className="absolute hidden lg:block top-4 left-1/2 transform -translate-x-1/2 pl-6"
    />
  </Section>
);

export default MakeSportYourLifestyle;
