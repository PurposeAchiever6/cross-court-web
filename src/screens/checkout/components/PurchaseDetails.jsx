import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { useSelector, useDispatch } from 'react-redux';

import device from 'shared/styles/mediaQueries';
import { purchaseFormattedDate } from 'shared/utils/date';
import Button from 'shared/components/Button';
import CCIcon from 'shared/components/CCIcon';
import { getCheckoutLoading } from '../reducer';
import { clearDiscount } from '../actionCreators';
import PromoCode from './PromoCode';

const PurchaseDetailsContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: flex-end;

  .purchase-details-box {
    display: flex;
    flex-direction: column;
    border: 1px solid #bbbecd;
    padding: 1.5rem;
    margin-top: 2rem;

    .date {
      align-self: flex-end;
      font-size: 1.2rem;
      line-height: 1.4rem;
      letter-spacing: 0.1em;
      flex: 1;
    }

    .total-container {
      font-weight: bold;
      font-size: 57px;
      line-height: 57px;
      display: flex;
      align-self: flex-end;
    }

    .purchase-details-container {
      display: flex;
      flex-direction: column;

      .title {
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 0.9rem;
        letter-spacing: 0.2em;
        color: #9999ff;
        margin-bottom: 0.8rem;
      }

      .plan-name {
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 1.5rem;
        letter-spacing: 0.1em;
        color: #000;
        margin-bottom: 0.5rem;
      }

      .sessions-qty {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.3rem;
        margin-bottom: 2rem;
      }
    }

    .payment-method-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;

      .title {
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 0.9rem;
        letter-spacing: 0.2em;
        color: #9999ff;
        margin-bottom: 0.8rem;
      }

      .card-data {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        svg {
          font-size: 2rem;
        }

        .card-info {
          margin-left: 1rem;

          .card-numbers {
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 22px;
            letter-spacing: 0.1em;
          }

          .expire-container {
            font-style: italic;
            font-weight: normal;
            font-size: 1rem;
            line-height: 1.3rem;
          }
        }
      }
    }
  }

  .promo-total-container {
    display: flex;
    height: 100%;
    justify-content: space-between;
  }

  .btn-container {
    width: inherit;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 5rem;
    button {
      margin-top: 2rem;
    }
  }

  @media (max-width: 991px) {
    .purchase-details-box {
      border: none;
      margin-top: 0;
      padding-top: 0;

      .date {
        font-size: 1rem;
        line-height: 1rem;
        margin-bottom: 2rem;
      }

      .payment-method-container {
        .card-data {
          flex-direction: row;
          justify-content: space-between;

          .card-info {
            width: 92%;
            display: flex;
            flex-direction: column;

            .card-numbers {
              margin-left: 0;
            }

            .expire-container {
              margin-left: 0;
            }
          }
        }
      }
      .promo-total-container {
        flex-direction: column;
        .total-container {
          margin-top: 2rem;
        }
      }
    }
    .btn-container {
      width: 50%;
    }
  }
`;

const PurchaseDetails = ({
  productDetails,
  paymentDetails,
  createPurchaseHandler,
  //isFreeSession,
  //createFreeSessionHandler,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCheckoutLoading);
  const checkoutHandler = /*isFreeSession ? createFreeSessionHandler :*/createPurchaseHandler;
  const purchaseDate = purchaseFormattedDate();

  useEffect(() => {
    dispatch(clearDiscount());
  }, [dispatch]);

  return (
    <PurchaseDetailsContainer>
      <div className="purchase-details-box">
        <div className="date">{purchaseDate}</div>

        <div className="purchase-details-container">
          <span className="title">YOUR PURCHASE</span>
          <div className="plan-name">{productDetails.name}</div>
          <div className="sessions-qty">{productDetails.description}</div>
        </div>
        <div className="payment-method-container">
          <span className="title">PAYMENT METHOD</span>
          <div className="card-data">
            <CCIcon ccType={paymentDetails.card.brand} />
            <div className="card-info">
              <span className="card-numbers">{`***${paymentDetails.card.last4}`}</span>
              <div className="expire-container">
                <span>
                  Expires {`${paymentDetails.card.expMonth}/${paymentDetails.card.expYear}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="promo-total-container">
          <PromoCode />
          <div className="total-container">
            {false/*isFreeSession*/ ? (
              <span>FREE</span>
            ) : (
              <span>{`$ ${currency(productDetails.price, {
                symbol: '$',
                precision: 2,
              })}`}</span>
            )}
          </div>
        </div>
      </div>
      <div className="btn-container">
        <Button className="ar-button" onClick={checkoutHandler} loading={isLoading}>
          <div className="ar-button-inner">CHECKOUT</div>
        </Button>
      </div>
    </PurchaseDetailsContainer>
  );
};

PurchaseDetails.propTypes = {
  paymentDetails: PropTypes.object.isRequired,
  productDetails: PropTypes.object.isRequired,
  //isFreeSession: PropTypes.bool.isRequired,
  createPurchaseHandler: PropTypes.func,
  //createFreeSessionHandler: PropTypes.func,
};

export default PurchaseDetails;
