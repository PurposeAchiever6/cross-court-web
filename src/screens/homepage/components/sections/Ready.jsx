import React from 'react';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';
import readyImg from 'screens/homepage/images/ready.jpg';

const Section = styled.section`
  background-image: url(${readyImg});
`;

const Ready = () => (
  <Section className="section-block text-white text-center md:min-h-screen flex flex-col justify-center bg-no-repeat bg-cover bg-center md:bg-fixed">
    <h1 className="mt-10 md:mt-0 font-dharma_gothic_cexbold text-transparent text-stroke-white text-9xl md:text-12xl 2xl:text-13xl mb-10">
      READY TO SWEAT?
    </h1>
    <div className="flex flex-col md:block mt-20 mb-20 md:mb-0 px-20">
      <PrimaryButton
        to={ROUTES.HOWITWORKS}
        inverted
        className="md:mr-4"
        contentClasses="w-full md:w-auto"
      >
        LEARN MORE
      </PrimaryButton>
      <PrimaryButton
        className="mt-4 md:mt-0 md:ml-4"
        to={ROUTES.LOCATIONS}
        contentClasses="w-full md:w-auto"
      >
        SEE SCHEDULE
      </PrimaryButton>
    </div>
  </Section>
);

export default Ready;
