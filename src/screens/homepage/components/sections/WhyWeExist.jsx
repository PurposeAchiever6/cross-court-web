import React from 'react';
import theFundamentalsImg from 'screens/homepage/images/the-fundamentals.jpg';
import styled from 'styled-components';

const Section = styled.section`
  background-image: url(${theFundamentalsImg});
`;

const WhyWeExist = () => (
  <Section className="section-block text-white bg-cc-black relative h-screen bg-no-repeat bg-cover bg-center bg-fixed">
    <div className="bg-cc-black bg-opacity-60 w-4/5 md:w-2/6 md:h-screen 2xl:ml-16 p-4 2xl:p-12 absolute right-0 md:right-10 text-right">
      <h1 className="text-8xl md:text-10xl 2xl:text-11xl dharma_gothic_cheavy text-transparent text-stroke-cc-purple mb-6">
        THE
        <br />
        FUNDAMENTALS
      </h1>
      <h2 className="text-base md:text-lg 2xl:text-2xl shapiro95_super_wide uppercase mb-6">
        Redefining group fitness through basketball
      </h2>
      <p className="text-sm md:text-base 2xl:text-lg">
        We exist to unite and ignite the world through the power of team-sport. To serve as an
        outlet for modern athlete to shed sweat and stress.
        <br />
        <br />
        To redefine group fitness by developing a community that knows success is only possible when
        achieved together. We win when we elevate those around us and know that a shot at greatness
        is always on the line.
      </p>
    </div>
  </Section>
);

export default WhyWeExist;
