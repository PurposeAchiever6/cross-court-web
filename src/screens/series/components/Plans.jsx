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
  .title {
    font-family: dharma_gothic_cheavy;
    font-size: 90px;
    line-height: 60px;
    letter-spacing: 1px;
    margin: 1rem 0;
    color: white;
  }
`;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${colors.brandBlue};
  color: white;
  padding: 1rem;
  padding-left: 2rem;
  position: relative;
  transition: transform 0.2s;
  margin-bottom: 1.5rem;
  height: 60.5vw;
  justify-content: center;

  @media (min-width: 992px) {
    justify-content: space-between;
    align-items: center;
    height: 24vw;
    width: 19.5vw;
    margin-bottom: 0;
    padding-left: 1rem;
  }

  :hover {
    transform: scale(1.05);
  }

  .name {
    font-family: shapiro96_inclined_wide;
    font-size: 16px;
    line-height: 16px;
    @media (min-width: 992px) {
      font-size: 22px;
      line-height: 22px;
    }
  }

  .price {
    font-family: dharma_gothic_cheavy_italic;
    text-align: center;
    font-size: 120px;
    line-height: 120px;
    .month {
      font-size: 60px;
      line-height: 60px;
    }
    @media (min-width: 992px) {
      font-size: 160px;
      line-height: 160px;
    }
  }

  .month-sub {
    font-family: shapiro95_super_wide;
    font-size: 10px;
    line-height: 10px;
    @media (min-width: 992px) {
      font-size: 12px;
      line-height: 12px;
    }
  }

  .pps {
    font-family: shapiro95_super_wide;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }

  .note {
    font-family: shapiro95_super_wide;
    font-size: 10px;
    line-height: 10px;
    margin-top: 0.5rem;
    @media (min-width: 992px) {
      text-align: center;
    }
  }

  .label {
    position: absolute;
    background-color: ${colors.brandBlue};
    border: 2px solid ${colors.brandBlue};
    font-family: shapiro95_super_wide;
    display: flex;
    color: ${colors.brandBlack};
    justify-content: center;
    transform: rotate(270deg);
    width: 60vw;
    right: 223px;
    @media (min-width: 992px) {
      top: -32px;
      width: 19.5vw;
      padding: 0.25rem;
      right: -2px;
      transform: rotate(0deg);
    }
  }
`;

const StyledCancel = styled.div`
  display: flex;
  color: white;
  font-family: shapiro95_super_wide;
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
      <PlansContainer className="flex flex-col md:flex-row m-3 md:m-5">
        <div className="w-full md:w-4/12">
          <p className="title">DROP IN</p>
          {oneTimeProducts.map((product) => {
            const sessionPrice = `$${formatPrice(product.price)}`;

            return (
              <PlanContainer key={product.id}>
                <p className="name">{product.name}*</p>
                <div className="flex flex-row md:flex-col justify-between">
                  <p className="price">{sessionPrice}</p>
                  <PrimaryButton
                    inverted
                    bg="transparent"
                    onClick={() => selectProductHandler(product)}
                  >
                    BUY
                  </PrimaryButton>
                </div>
                <p className="note">*Expires in 30 days</p>
              </PlanContainer>
            );
          })}
        </div>

        <div className="w-full md:w-8/12">
          <div className="flex">
            <p className="title">MEMBERSHIP</p>
            <img className="w-4 h-4" src={Ball} alt="Icon" />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            {membershipProducts.map((product) => {
              const sessionLabel = product.name;
              const isUnlimited = product.credits === -1;

              const sessionPrice = `$${formatPrice(product.price)}`;
              const sessionPPS = `$${formatPrice(product.price / product.credits)}/session`;
              const mostPopular = sessionLabel === '8 SESSIONS';
              const bestValue = sessionLabel === 'UNLIMITED';

              return (
                <PlanContainer key={product.id}>
                  {mostPopular && <span className="label">MOST POPULAR</span>}
                  {bestValue && <span className="label">BEST VALUE</span>}
                  <div className="flex flex-row md:flex-col items-end md:items-start">
                    <p className="name">{sessionLabel}</p>
                    {!isUnlimited && <p className="month-sub">/month*</p>}
                  </div>

                  <div className="flex flex-row md:flex-col justify-between">
                    <div className="flex flex-col">
                      <p className="price">
                        {sessionPrice}
                        <span className="month">/month</span>
                      </p>
                      {!isUnlimited && <p className="pps">{sessionPPS}</p>}
                    </div>
                    <PrimaryButton onClick={() => selectProductHandler(product)}>
                      JOIN
                    </PrimaryButton>
                  </div>

                  {!isUnlimited && <p className="note">*Sessions do not rollover</p>}
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
