import React from 'react';
import ROUTES from 'shared/constants/routes';
import styled from 'styled-components';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const Title = styled.p`
  font-family: dharma_gothic_cexbold;
  color: black;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
  font-size: 120px;
  line-height: 100px;
  @media (min-width: 992px) {
    margin-top: 150px;
    font-size: 250px;
    line-height: 200px;
  }
`;

const Ready = () => (
  <section className="ready text-white text-center md:h-screen flex flex-col justify-center">
    <Title className="mt-10 md:mt-0">READY TO SWEAT?</Title>
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
  </section>
);

export default Ready;
