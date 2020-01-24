import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';
import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import { Link } from 'react-router-dom';

const MyCreditsContainer = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 2rem 0;
  }
  .sessions-number-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #bbbecd;
    font-size: 18px;
    line-height: 22px;
    padding: 1rem 2rem;
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;

    .session-number {
      font-weight: 500;
      font-size: 57px;
      line-height: 47px;
      margin-bottom: 0.75rem;
    }
  }
  a {
    width: 100%;
  }
  .btn {
    background-color: #000;
    color: #fff;
    width: 100%;
  }
  .alt-btn {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    margin-top: 2rem;
    width: 100%;
  }
`;

const MyCredits = ({ credits }) => {
  return (
    <MyCreditsContainer>
      <h3>My Credits</h3>
      <div className="sessions-number-container">
        <span className="session-number">{credits}</span>
        <span>Sessions Left</span>
      </div>
      <Link to="/series">
        <Button className="btn">Purchase Sessions</Button>
      </Link>
      <Link to="/purchase-history">
        <AlternativeButton className="alt-btn">Purchases History</AlternativeButton>
      </Link>
    </MyCreditsContainer>
  );
};

MyCredits.propTypes = {
  credits: number.isRequired,
};

export default MyCredits;
