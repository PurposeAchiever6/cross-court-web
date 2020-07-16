import React from 'react';
import styled from 'styled-components';

import ArButton from 'shared/components/ArButton';
import device from 'shared/styles/mediaQueries';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  .text-container {
    display: grid;
    flex: 1;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    max-width: 37.5rem;
  }

  .text-show {
    grid-row: 2;
    justify-self: center;
  }

  .text-sweat {
    grid-row: 3;
    font-style: italic;
    font-weight: bold;
    justify-self: flex-end;
  }

  .make-sport-your-lifestyle {
    color: ${colors.white};
    font-size: 3.5rem;
  }

  @media (max-width: 991px) {
    .text-container {
      font-size: 0.8rem;
      padding: 0 2rem;
      max-width: 400px;
    }
  }
`;

const Buttons = styled.div`
  flex: 1;

  .buttons-container {
    display: flex;

    button {
      margin: 0 1rem;
      height: 50px;
    }
  }

  .alternative-btn {
    padding: 1rem 2.5rem;
  }

  @media (max-width: 991px) {
    .buttons-container {
      flex-direction: column-reverse;

      button:first-child {
        margin-top: 2rem;
      }
    }
  }
`;

const Signup = () => (
  <>
    <TextWrapper>
      <div className="text-container">
        <span className="make-sport-your-lifestyle shapiro95_super_wide">
          MAKE SPORT YOUR <em className="shapiro96_inclined_wide">LIFESTYLE</em>
        </span>
      </div>
    </TextWrapper>
    <Buttons>
      <div className="buttons-container">
        <ArButton link={ROUTES.HOWITWORKS} double inverted>
          FIRST TIME?
        </ArButton>
        <ArButton link={ROUTES.LOCATIONS} double>
          BOOK SESSION
        </ArButton>
      </div>
    </Buttons>
  </>
);

export default Signup;
