import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import ROUTES from 'shared/constants/routes';
import device from 'shared/styles/mediaQueries';
import MembershipDesktopBg from '../images/membership-desktop-bg.jpg';
import MembershipMobileBg from '../images/membership-mobile-bg.jpg';

const Section = styled.section`
  height: 100vh;
  background-image: url(${MembershipDesktopBg});
  box-shadow: inset 0 0 0 2000px ${colors.blackOverlay};
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

  @media (max-width: 991px) {
    background-image: url(${MembershipMobileBg});
  }

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
      <p className="note">We bring the venue, staff, and equipment.</p>
      <p className="note">
        <em>You bring the energy.</em>
      </p>
      <Link to={ROUTES.LOCATIONS}>
        <Button>Find a Session</Button>
      </Link>
    </div>
    <div className="memberships-container">
      <span className="text">New to Crosscourt?</span>
      <Link to={ROUTES.HOWITWORKS}>
        <AlternativeButton>Learn More</AlternativeButton>
      </Link>
    </div>
  </Section>
);

export default Memberships;
