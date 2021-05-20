import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import currency from 'currency.js';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import colors from 'shared/styles/constants';
import Ball from 'shared/images/white-circular-logo.png';

const FREE_SESSION = 'Free Session';
const ONE_TIME = 'one_time';
const RECURRING = 'recurring';

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem;
  color: white;
  .title {
    font-family: dharma_gothic_cheavy;
    font-size: 90px;
    line-height: 90px;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }
  .one-time {
    width: 30%;
    display: flex;
    flex-direction: column;
  }

  .memberships {
    width: 70%;
    display: flex;
    flex-direction: column;
    .plan-options {
      justify-content: space-between;
    }
    .img-and-title {
      display: flex;
    }
    .logo {
      margin: 0.5rem;
    }
  }

  .plan-options {
    display: flex;
  }
`;

const PlanContainer = styled.div`
  p {
    margin: 0;
  }

  position: relative;
  height: 25vw;
  width: 18vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${colors.brandBlue};
  transition: transform 0.2s;
  .price {
    margin-top: 60px;
    font-family: dharma_gothic_cheavy_italic;
    font-size: 150px;
    line-height: 100px;
    text-align: center;
    .month {
      font-size: 60px;
      line-height: 60px;
    }
  }
  .name {
    font-family: shapiro96_inclined_wide;
    font-size: 22px;
    line-height: 22px;
    text-align: center;
  }

  .pps {
    font-family: shapiro75_heavy_wide;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }

  .note {
    font-family: shapiro75_heavy_wide;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    margin-top: 1rem;
  }

  :hover {
    transform: scale(1.05);
  }

  .label {
    font-family: shapiro75_heavy_wide;
    display: flex;
    position: absolute;
    top: -32px;
    width: 18vw;
    background-color: ${colors.brandBlue};
    border: 2px solid ${colors.brandBlue};
    color: ${colors.brandBlack};
    justify-content: center;
    padding: 0.25rem;
  }
`;

const StyledCancel = styled.div`
  display: flex;
  color: white;
  font-family: shapiro75_heavy_wide;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin: 5rem;
  p {
    margin-bottom: 0;
    margin-left: 1rem;
  }
`;

const Plans = ({ selectProductHandler, availableProducts }) => {
  const formatPrice = (price) =>
    currency(price, {
      symbol: '$',
      precision: 0,
    });

  const products = availableProducts.filter((product) => product.name !== FREE_SESSION);

  const oneTimeProducts = products.filter((product) => product.productType === ONE_TIME);
  const membershipProducts = products.filter((product) => product.productType === RECURRING);

  return (
    <>
      <PlansContainer>
        <div className="one-time">
          <p className="title">DROP IN</p>
          <div className="plan-options">
            {oneTimeProducts.map((product) => {
              const sessionPrice = `$${formatPrice(product.price)}`;

              return (
                <PlanContainer key={product.id} product={product}>
                  <div>
                    <p className="name">{product.name}*</p>
                    <p className="price">{sessionPrice}</p>
                  </div>
                  <div>
                    <PrimaryButton
                      inverted
                      bg="transparent"
                      w="100%"
                      onClick={() => selectProductHandler(product)}
                    >
                      BUY
                    </PrimaryButton>
                    <p className="note">*Expires in 30 days</p>
                  </div>
                </PlanContainer>
              );
            })}
          </div>
        </div>
        <div className="memberships">
          <div className="img-and-title">
            <p className="title">MEMBERSHIP</p>
            <img className="logo" width="25px" height="25px" src={Ball} alt="Icon" />
          </div>
          <div className="plan-options">
            {membershipProducts.map((product) => {
              const sessionLabel = product.name;
              const isUnlimited = product.credits === -1;

              const sessionPrice = `$${formatPrice(product.price)}`;
              const sessionPPS = `$${formatPrice(product.price / product.credits)}/session`;
              const mostPopular = sessionLabel === '8 SESSIONS';
              const bestValue = sessionLabel === 'UNLIMITED';

              return (
                <PlanContainer key={product.id} product={product}>
                  {mostPopular && <span className="label">MOST POPULAR</span>}
                  {bestValue && <span className="label">BEST VALUE</span>}
                  <div>
                    <p className="name">{sessionLabel}</p>
                    <p className="price">
                      {sessionPrice}
                      <span className="month">/month</span>
                    </p>
                    {!isUnlimited && <p className="pps">{sessionPPS}</p>}
                  </div>
                  <div>
                    <PrimaryButton w="100%" onClick={() => selectProductHandler(product)}>
                      JOIN
                    </PrimaryButton>
                    <p className="note">{isUnlimited ? '' : '*Sessions do not rollover'}</p>
                  </div>
                </PlanContainer>
              );
            })}
          </div>
        </div>
      </PlansContainer>
      <StyledCancel>
        <img className="logo" width="25px" height="25px" src={Ball} alt="Icon" />
        <p>Cancel Anytime</p>
      </StyledCancel>
    </>
  );
};

Plans.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Plans;
