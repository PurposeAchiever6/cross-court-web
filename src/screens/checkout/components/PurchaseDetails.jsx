import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import currency from 'currency.js';
import { useSelector } from 'react-redux';

import device from 'shared/styles/mediaQueries';
import Button from 'shared/components/Button';
import CCIcon from 'shared/components/CCIcon';
import { getCheckoutLoading } from '../reducer';

const PurchaseDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .purchase-details-box {
    width: 40%;
    display: flex;
    flex-direction: row;
    border: 1px solid #bbbecd;
    padding: 1.5rem;
    margin-top: 2rem;

    .right-side {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      flex: 1;

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
      }
    }
    .purchase-details-container {
      display: flex;
      flex-direction: column;

      .title {
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 0.9rem;
        letter-spacing: 0.2em;
        color: #aaaff3;
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
      .title {
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 0.9rem;
        letter-spacing: 0.2em;
        color: #aaaff3;
        margin-bottom: 0.8rem;
      }

      .card-data {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg {
        font-size: 2rem;
      }

      .card-numbers {
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 22px;
        letter-spacing: 0.1em;
        margin-left: 1rem;
      }

      .expire-container {
        font-style: italic;
        font-weight: normal;
        font-size: 1rem;
        line-height: 1.3rem;
        margin-left: 2rem;
      }
    }
  }

  .btn-container {
    width: 43%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 5rem;
    button {
      margin-top: 2rem;
    }
  }

  @media ${device.mobile} {
    .purchase-details-box {
      width: 75%;

      .right-side {
        .date {
          font-size: 1rem;
          line-height: 1rem;
        }

        .total-container {
          font-size: 1.2rem;
          line-height: 1.2rem;
        }
        .left-side {
          .payment-method-container {
            .card-data {
              flex-direction: column;
              justify-content: space-between;

              .card-info {
                width: 92%;
                display: flex;

                .card-numbers {
                  margin-left: 0;
                }

                .expire-container {
                  margin-left: 0;
                }
              }
            }
          }
        }
      }
    }

    .btn-container {
      width: 48%;
    }
  }
`;

const PurchaseDetails = ({
  productDetails,
  paymentDetails,
  createPurchaseHandler,
  isFreeSession,
  createFreeSessionHandler,
}) => {
  const isLoading = useSelector(getCheckoutLoading);
  const checkoutHandler = isFreeSession ? createFreeSessionHandler : createPurchaseHandler;
  return (
    <PurchaseDetailsContainer>
      <div className="purchase-details-box">
        <div className="left-side">
          <div className="purchase-details-container">
            <span className="title">Your Purchase</span>
            <div className="plan-name">{productDetails.name}</div>
            <div className="sessions-qty">{productDetails.description}</div>
          </div>
          <div className="payment-method-container">
            <span className="title">Payment Method</span>
            <div className="card-data">
              <CCIcon ccType={paymentDetails.card.brand} />
              <div className="card-info">
                <span className="card-numbers">{`**** ${paymentDetails.card.last4}`}</span>
                <div className="expire-container">
                  <span>
                    Expires {`${paymentDetails.card.expMonth}/${paymentDetails.card.expYear}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="date">{format(new Date(), 'M/d/yyyy')}</div>
          <div className="total-container">
            {isFreeSession ? (
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
        <Button onClick={checkoutHandler} loading={isLoading}>
          Check-out
        </Button>
      </div>
    </PurchaseDetailsContainer>
  );
};

export default PurchaseDetails;
