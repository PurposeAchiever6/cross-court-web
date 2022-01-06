import React from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ROUTES from 'shared/constants/routes';
import playButtonPurpleIcon from 'shared/images/play-button-purple.png';
import styled from 'styled-components';
import pickUpBasketBall from 'screens/homepage/images/pick-up-basketball-los-angeles.jpg';

const Section = styled.section`
  background-image: url(${pickUpBasketBall});
`;

const CrosscourtIsAHighIntensity = () => (
  <Section className="section-block text-white h-screen relative bg-fixed bg-no-repeat bg-cover bg-center">
    <h1 className="z-10 text-transparent text-stroke-cc-purple font-dharma_gothic_cheavy_italic uppercase absolute top-10 md:top-22 text-7xl md:text-12xl 2xl:text-13xl left-5 md:left-10">
      Basketball based fitness
    </h1>
    <div className="bg-cc-black bg-opacity-60 w-4/5 md:w-2/6 md:h-screen md:ml-16 p-4 md:p-12 top-28 md:top-0 absolute">
      <h2 className="text-base md:text-lg 2xl:text-2xl shapiro95_super_wide uppercase mb-8 mt-10 md:mt-60">
        Crosscourt&apos;s the first, high intesity, basketball based fitness experience for the
        modern athlete.
      </h2>
      <p className="text-sm md:text-base 2xl:text-lg mb-4">
        Our guided 60 minute, 15 player sessions use a hollistic approach to fitness that challenge
        us physically, engage us socially, and recharge us mentally.
      </p>
      <PrimaryButton inverted bg="transparent" to={ROUTES.HOWITWORKS}>
        <img alt="" className="inline-block w-5 h-5 mr-2" src={playButtonPurpleIcon} />
        <span>How it works</span>
      </PrimaryButton>
    </div>
  </Section>
);

export default CrosscourtIsAHighIntensity;
