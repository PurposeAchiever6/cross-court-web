import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
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

  .text {
    font-weight: 500;
    font-size: 3.5rem;
    color: ${colors.white};
    text-transform: uppercase;
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

  @media ${device.mobile} {
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

  @media ${device.mobile} {
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
        <span className="text">Sign up.</span>
        <span className="text text-show">Show up.</span>
        <span className="text text-sweat">Sweat</span>
      </div>
    </TextWrapper>
    <Buttons>
      <div className="buttons-container">
        <Link to={ROUTES.LOCATIONS}>
          <AlternativeButton>Book a session</AlternativeButton>
        </Link>
        <Link to={ROUTES.HOWITWORKS}>
          <Button>First Time?</Button>
        </Link>
      </div>
    </Buttons>
  </>
);

export default Signup;
