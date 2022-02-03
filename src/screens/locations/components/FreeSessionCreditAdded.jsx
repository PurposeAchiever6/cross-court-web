import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const FreeSessionCreditAddedContainer = styled.div`
  background: linear-gradient(
    0deg,
    white 0%,
    rgba(91, 91, 91, 0.25) 5%,
    rgba(65, 65, 65, 0.5) 15%,
    rgb(39, 39, 39, 0.75) 25%,
    ${colors.brandBlack} 50%
  );
  height: 200vh;
`;

const FreeSessionCreditAdded = () => {
  useEffect(() => {
    document.body.setAttribute('data-page', 'free-session-credit-added');
  }, []);

  return (
    <FreeSessionCreditAddedContainer className="free-session-credit-added relative text-white">
      <div className="animate-fade fixed inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none px-5">
        <div className="title whitespace-pre-wrap sm:whitespace-normal">
          <div className="font-shapiro95_super_wide tracking-wide md:pl-2 mb-1">
            {`FREE\nSESSION\nCREDIT`}
          </div>
          <div className="font-shapiro97_air_extd">{`ADDED\nTO\nACCOUNT`}</div>
        </div>
      </div>
      <div className="animate-slide-top fixed bottom-10 inset-x-0 text-center">
        <div className="scroll">
          <div className="w-1 h-20 sm:h-24 bg-white inline-block mb-4"></div>
          <div className="font-shapiro95_super_wide text-xs md:text-lg">SCROLL TO BOOK SESSION</div>
        </div>
      </div>
    </FreeSessionCreditAddedContainer>
  );
};

export default FreeSessionCreditAdded;
