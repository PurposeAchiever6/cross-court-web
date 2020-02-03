import React from 'react';
import styled from 'styled-components';
import currency from 'currency.js';

import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';
import PurpleBg from '../images/CirclePurpleBg.png';

const PlansContainer = styled.div`
  padding: 4rem 0;

  .plans-container {
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 6rem;
    grid-row-gap: 6rem;
    padding: 0 10rem;
  }

  @media ${device.mobile} {
    .plans-container {
      grid-row-gap: 16rem;
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  }
`;

const PlanContainer = styled.div`
  position: relative;
  height: 34rem;
  background-image: url(${props => props.product.imageUrl});
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
      font-size: 45.6489px;
      line-height: 68px;
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

  @media ${device.mobile} {
    height: 32rem;
    margin-bottom: 6rem;
    padding: 0;
    background-image: url(${props => props.product.imageUrl});

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    .sticker {
      height: 8rem;
      width: 8rem;
      top: 6rem;
      right: 1rem;

      .price {
        font-size: 2rem;
        line-height: 2rem;
      }
      .text {
        font-size: 1rem;
        line-height: 2rem;
      }
    }

    .title {
      position: absolute;
      bottom: -0.5rem;
      left: 1rem;
    }

    .button-container {
      width: 90%;
      position: absolute;
      bottom: -7rem;
      button {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }
  }
`;

const Plans = ({ selectProductHandler, availableProducts }) => {
  const formatPrice = price =>
    currency(price, {
      symbol: '$',
      precision: 0,
    });

  const products = availableProducts.filter(product => product.name !== 'Free Session');
  console.log(availableProducts);
  return (
    <PlansContainer>
      <div className="plans-container">
        {products.map(product => {
          const [firstWord, secondWord] = product.name.split(' ');
          const buttonText = `${product.credits} ${
            product.credits > 1 ? 'sessions' : 'session'
          } for $ ${formatPrice(product.price)}`;

          return (
            <PlanContainer key={product.stripeId} product={product}>
              <div className="sticker">
                <span className="price">{`$ ${formatPrice(product.price)}`}</span>
                <span className="text">/session</span>
              </div>
              <div className="title">
                <span className="first-word">{firstWord}</span>
                <span className="second-word">{secondWord}</span>
              </div>
              <div className="button-container">
                <Button onClick={() => selectProductHandler(product)}>{buttonText}</Button>
                <hr />
              </div>
            </PlanContainer>
          );
        })}
      </div>
    </PlansContainer>
  );
};

export default Plans;
