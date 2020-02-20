import React from 'react';
import styled from 'styled-components';
import ROUTES from 'shared/constants/routes';
import { Link } from 'react-router-dom';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import MembershipImage from '../images/Membership.jpg';
import MembershipDesktop from '../images/MembershipDesktop.jpg';

const MembershipSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${colors.white};
  background-image: url(${MembershipImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .membership-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .membership-title {
    font-weight: 500;
    font-size: 1.5rem;
  }

  .membership-text {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .membership-find {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 130px;
    justify-content: space-between;

    button {
      padding: 1rem 3rem;
      width: 100%;
    }
  }

  @media ${device.desktop} {
    background-image: url(${MembershipDesktop});

    .membership-title {
      font-size: 1.75rem;
    }

    .membership-text,
    button {
      font-size: 1.125rem;
    }
  }
`;

function Membership() {
  return (
    <MembershipSection>
      <div className="membership-info">
        <h2 className="membership-title">Ready to Sweat?</h2>
      </div>
      <div className="membership-find">
        <Link to={ROUTES.LOCATIONS}>
          <Button>See Schedule</Button>
        </Link>
      </div>
    </MembershipSection>
  );
}

export default Membership;
