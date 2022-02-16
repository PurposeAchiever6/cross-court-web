import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import { useSelector, useDispatch } from 'react-redux';

import { purchaseFormattedDate } from 'shared/utils/date';
import CCIcon from 'shared/components/CCIcon';
import { getCheckoutLoading } from '../reducer';
import { clearDiscount } from '../actionCreators';
import PromoCode from './PromoCode';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import { productPrice } from 'screens/products/utils';

const PurchaseDetailsContainer = styled.div`
  .purchase-details-box {
    display: flex;
    flex-direction: column;
    border: 1px solid #bbbecd;
    padding: 1.5rem;

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
  paymentMethod,
  createPurchaseHandler,
  userHasActiveSubscription,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCheckoutLoading);
  const checkoutHandler = createPurchaseHandler;
  const purchaseDate = purchaseFormattedDate();

  const price = currency(productPrice(productDetails, userHasActiveSubscription), {
    formatWithSymbol: true,
    precision: 2,
  }).format();

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
            <CCIcon ccType={paymentMethod.brand} />
            <div className="card-info">
              <span className="card-numbers">{`***${paymentMethod.last4}`}</span>
              <div className="expire-container">
                <span>
                  Expires {`${paymentMethod.expMonth}/${paymentMethod.expYear}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="promo-total-container">
          <PromoCode />
          <div className="total-container">{price}</div>
        </div>
      </div>
      <div className="btn-container">
        <PrimaryButton onClick={checkoutHandler} loading={isLoading}>
          CHECKOUT
        </PrimaryButton>
      </div>
    </PurchaseDetailsContainer>
  );
};

PurchaseDetails.propTypes = {
  paymentMethod: PropTypes.object.isRequired,
  productDetails: PropTypes.object.isRequired,
  createPurchaseHandler: PropTypes.func,
  userHasActiveSubscription: PropTypes.bool.isRequired,
};

export default PurchaseDetails;
