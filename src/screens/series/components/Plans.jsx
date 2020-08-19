import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import currency from 'currency.js';

import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';

import PurpleBg from '../images/circle-purple-bg.png';

const PlansContainer = styled.div`
  .plans-container {
    margin: 0 6rem;
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 991px) {
    .plans-container {
      margin: 0;
      flex-direction: column;
      padding: 0;
    }
  }
`;

const PlanContainer = styled.div`
  position: relative;
  margin: 2rem auto 0;
  height: 30vw;
  width: 30vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.75rem;
  justify-content: flex-end;

  .sticker {
    position: absolute;
    background-image: url(${PurpleBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 202px;
    width: 202px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3rem;
    right: 2rem;
    color: #fff;
    flex-direction: column;

    .price {
      font-weight: bold;
      font-size: 4rem;
      line-height: 5rem;
      font-family: 'Space Mono';
    }

    .text {
      font-weight: 500;
      font-size: 1.5rem;
      letter-spacing: 0.04em;
    }
  }

  .title {
    display: flex;
    font-size: 3.5rem;
    line-height: 4rem;
    letter-spacing: 0.04em;
    color: #fff;
    text-transform: uppercase;
    align-self: flex-start;
    margin-bottom: 1rem;
    flex-direction: column;

    .first-word {
      padding: 0 0.75rem;
    }

    .second-word {
      background-color: #000;
      font-weight: bold;
      padding: 0 0.75rem;
    }
  }

  .button-container {
    width: 100%;
    hr {
      display: none;
    }
    button {
      width: 100%;
    }
  }

  // @media (max-width: 991px) {
  //   height: 20rem;
  //   width: 100%;
  //   margin: 0 0 8rem 0;
  //   padding: 0;
  //   background-image: url(${props => props.product.imageUrl});

  //   background-repeat: no-repeat;
  //   background-position: center;
  //   .sticker {
  //     height: 8rem;
  //     width: 8rem;
  //     top: 2rem;
  //     right: 1rem;

  //     .price {
  //       font-size: 2rem;
  //       line-height: 2rem;
  //     }
  //     .text {
  //       font-size: 1rem;
  //       line-height: 2rem;
  //     }
  //   }

  //   .title {
  //     position: absolute;
  //     bottom: -2.7rem;
  //     left: 1rem;
  //   }

  //   .button-container {
  //     width: 90%;
  //     position: absolute;
  //     bottom: -7rem;
  //     button {
  //       width: 100%;
  //       margin-bottom: 1.5rem;
  //     }
  //   }
  // }
`;

const Plans = ({ selectProductHandler, availableProducts }) => {
  const formatPrice = price =>
    currency(price, {
      symbol: '$',
      precision: 0,
    });

  const products = availableProducts.filter(product => product.name !== 'Free Session');
  return (
    <PlansContainer className="series-plans-container">
      <section className="title-block">
        <p className="heading-sprite"></p>
        {/* <h2 className="title-1">THE CC</h2>
        <p className="title-2">SERIES</p> */}
      </section>
      <div className="plans-container">
        {products.map(product => {
          const [firstWord, secondWord] = product.name.split(' ');
          // const buttonText = `${product.credits} ${
          //   product.credits > 1 ? 'SESSIONS' : 'SESSION'
          // } FOR $${formatPrice(product.price)}`;
          const sessionLabel = `${product.credits} ${product.credits > 1 ? 'SESSIONS' : 'SESSION'}`;
          const sessionPrice = `$${formatPrice(product.price)}`;
          const sessionPPS = `$${formatPrice(product.price / product.credits)}/SESSION`;
          const buyLabel = 'BUY';
          const mostPopular = sessionLabel === '5 SESSIONS';
          const bestValue = sessionLabel === '10 SESSIONS';

          return (
            <PlanContainer className="plan-container" key={product.stripeId} product={product}>
              {mostPopular ? <span className="most-popular animate__animated animate__bounce animate__delay-1s animate__faster animate__slideInUp">MOST POPULAR</span> : ''}
              {bestValue ? <span className="best-value animate__animated animate__bounce animate__delay-2s animate__fast animate__jackInTheBox">BEST VALUE</span> : ''}
              <div className="session-info">
                <div className="session-label">{sessionLabel}</div>
                <div className="session-price">{sessionPrice}</div>
                <div className="session-pps">{sessionPPS}</div>
              </div>
              <div className="button-container">
                <Button className="ar-button inverted" onClick={() => selectProductHandler(product)}>
                  <div className="ar-button-inner">{buyLabel}</div>
                </Button>
              </div>
              {/* <div className="sticker">
                <span className="price">{`$${formatPrice(product.price / product.credits)}`}</span>
                <span className="text">/session</span>
              </div> */}
              {/* <div className="title">
                <span className="first-word">{firstWord}</span>
                <span className="second-word">{secondWord}</span>
              </div> */}
              {/* <div className="button-container">
                <Button className="ar-button inverted" onClick={() => selectProductHandler(product)}>
                  <div className="ar-button-inner">{buttonText}</div>
                </Button>
                <hr />
              </div> */}
            </PlanContainer>
          );
        })}
      </div>
    </PlansContainer>
  );
};

Plans.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Plans;
