import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import colors from 'shared/styles/constants';
import ROUTES from 'shared/constants/routes';
import AlternativeButton from 'shared/components/AlternativeButton';
import { Link } from 'react-router-dom';

const MyCreditsContainer = styled.div`
  padding: 1rem;
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.grey};

  * {
    flex: 1;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
  .sessions-number-container {
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.grey};
    text-align: center;
    padding: 1rem;
    margin-right: 1rem;

    .session-number {
      font-weight: 500;
      font-size: 57px;
      margin-bottom: 0.75rem;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn {
    background-color: ${colors.black};
    color: ${colors.white};
    width: 100%;
    padding: 1rem 1rem;
  }
  .alt-btn {
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.black};
    width: 100%;
    padding: 0.7rem 1rem;
    height: 100%;
  }
`;

const MyCredits = ({ credits }) => (
  <MyCreditsContainer>
    <div className="sessions-number-container">
      <span className="session-number">{credits}</span>
      <span>Sessions Left</span>
    </div>
    <div className="links">
      <Link to={ROUTES.SERIES}>
        <Button className="btn">Purchase Sessions</Button>
      </Link>
      <Link to={ROUTES.PURCHASEHISTORY}>
        <AlternativeButton className="alt-btn">Purchases History</AlternativeButton>
      </Link>
    </div>
  </MyCreditsContainer>
);

MyCredits.propTypes = {
  credits: number,
};

export default MyCredits;
