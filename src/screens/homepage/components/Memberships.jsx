import React from 'react';
import styled from 'styled-components';

import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import MembershipDesktopBg from '../images/membership-desktop-bg.jpg';

const Section = styled.section`
  height: 100vh;
  background-image: url(${MembershipDesktopBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 0.5rem;
  padding-top: 7rem;
  box-sizing: border-box;

  button {
    margin-top: 1.75rem;
    min-height: 50px;
  }

  .memberships-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;

    &:first-child {
      button {
        margin-top: 4rem;
      }
    }
  }

  .note {
    color: ${colors.white};
    font-weight: 500;
    font-size: 1.75rem;
    line-height: 2rem;
    width: 80%;
    letter-spacing: 0.05rem;
    text-align: center;
    margin: 0.1rem 0;
    width: 100%;
  }

  .text {
    font-size: 0.9rem;
    color: ${colors.white};
  }
`;

const Memberships = () => (
  <Section>
    <div className="memberships-container">
      <p className="note">We bring the venue, referee, and equipment.</p>
      <p className="note">
        <em>You bring the energy.</em>
      </p>
      <Button>Explore Memberships</Button>
    </div>
    <div className="memberships-container">
      <span className="text">Are you a first time player?</span>
      <AlternativeButton>Learn More</AlternativeButton>
    </div>
  </Section>
);

export default Memberships;
